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
  room;
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
  temp_room;
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
      RoomKey: this.roomKey$,
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
      alert("Square foot is not provided !");
    } else if (!Barcode) {
      alert("Barcode is not provided !");
    }
    else {
      this.inventoryService
        .checkUniqueBarcode_Updation(Barcode, this.roomKey$, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.unqBar = data;
          if (this.unqBar.Barcode != 0) {
            alert("Barcode already exists !");
          }
          else if(this.temp_room!=RoomName)
          {
            this.inventoryService
            .checkRoomName(RoomName, this.OrganizationID)
            .subscribe((data: Inventory[]) => {
              if (data[0].count > 0) {
                alert("Room Name already exists !");
              }
              else
              {
                this.inventoryService.updateRoom(this.update_Room)
              .subscribe(res => {
                alert("Room updated successfully");
                this.router.navigateByUrl('/roomView');
              });
              }
            });
          }
          else  {
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
        this.temp_room=this.room.RoomName;
        this.inventoryService
          .getallFloorList(this.room.FacilityKey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.floor = data;
          });
        this.inventoryService
          .getallZoneList(this.room.FacilityKey, this.room.FloorKey, this.OrganizationID)
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
