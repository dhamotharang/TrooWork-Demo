import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {

  roomKey$: Number;
  building: Inventory[];
  floorType: Inventory[];
  roomType: Inventory[];
  floor: Inventory[];
  zone: Inventory[];
  room: Array<any>;
  facKey: Number;
  floorKey: Number;
  zoneKey: Number;
  roomTypeKey: Number;
  floorTypeKey: Number;
  ZoneName: String;
  roomkey;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  update_Room;
  unqBar;
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.roomKey$ = params.RoomKey);
  }

  selectFloorfromBuildings(facKey) {
    this.facKey = facKey;
    this.inventoryService
      .getallFloorList(facKey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.floor = data;
      });
  }

  selectZonefromFloor(flrKey) {
    this.floorKey = flrKey;
    this.inventoryService
      .getallZoneList(this.facKey, flrKey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.zone = data;
      });
  }

  setZoneKey(zonekey) {
    this.zoneKey = zonekey;
  }
  setRoomType(roomTKey) {
    this.roomTypeKey = roomTKey;
  }
  setFloorType(flrTKey) {
    this.floorTypeKey = flrTKey;
  }
  setZoneName(zoneName) {
    this.ZoneName = zoneName;
  }

  updateRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName, SquareFoot, Barcode) {
    this.update_Room = {
      FacilityKey: FacilityKey,
      FloorKey: FloorKey,
      FloorTypeKey: FloorTypeKey,
      ZoneKey: ZoneKey,
      RoomTypeKey: RoomTypeKey,
      RoomKey: this.roomkey,
      area: SquareFoot,
      RoomName: RoomName,
      Barcode: Barcode,
      employeekey: this.employeekey,
      OrganizationID: this.OrganizationID

    };

    if (!FacilityKey) {
      alert("Building name is not provided !");
    } else if (!FloorKey) {
      alert("Floor name is not provided!");
    } else if (!FloorTypeKey) {
      alert("FloorType is not provided !");
    } else if (!ZoneKey) {
      alert("Zone name is not provided !");
    } else if (!RoomTypeKey) {
      alert("RoomType is not provided !");
    } else if (!RoomName) {
      alert("Room name is not provided !");
    } else if (!SquareFoot) {
      alert("Area is not provided !");
    } else if (!Barcode) {
      alert("Barcode is not provided !");
    }
    else {
      this.inventoryService
        .checkUniqueBarcode_Updation(Barcode, this.roomkey, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          debugger;
          this.unqBar = data;
          if (this.unqBar.Barcode!=0) {
            alert("Barcode already exists !");
          }
          else {
            this.inventoryService.updateRoom(this.update_Room)
              .subscribe(res => {
                alert("Room updated successfully");
                this.router.navigateByUrl('/roomView');
              });
          }
        });
    }
  }


  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService
      .getRoomDetailsList(this.roomKey$, this.OrganizationID)
      .subscribe((data: Array<any>) => {
        this.room = data[0];
        this.facKey = data[0].FacilityKey;
        this.floorKey = data[0].FloorKey;
        this.zoneKey = data[0].FloorKey;
        this.roomkey = data[0].RoomKey;

        this.inventoryService
          .getallFloorList(this.facKey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.floor = data;
          });
        this.inventoryService
          .getallZoneList(this.facKey, this.floorKey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.zone = data;
          });
      });


    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });

    this.inventoryService
      .getallFloorTypeList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.floorType = data;
      });
    this.inventoryService
      .getallRoomTypeList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.roomType = data;
      });
  }
}
