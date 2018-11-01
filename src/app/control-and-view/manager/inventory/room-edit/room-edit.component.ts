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

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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

  // updateRoom(RoomName, SquareFoot, barcode) {
  //   if (!this.facKey) {
  //     alert("Building name is not provided !");
  //   } else if (!this.floorKey) {
  //     alert("Floor name is not provided!");
  //   } else if (!this.floorTypeKey) {
  //     alert("FloorType is not provided !");
  //   } else if (!this.zoneKey) {
  //     alert("Zone name is not provided !");
  //   } else if (!this.roomTypeKey) {
  //     alert("RoomType is not provided !");
  //   } else if (!RoomName) {
  //     alert("Room name is not provided !");
  //   } else if (!SquareFoot) {
  //     alert("SquareFoot is not provided !");
  //   } else if (!barcode) {
  //     alert("Barcode is not provided !");
  //   } else {
  //     this.inventoryService
  //       .checkNewRoom(this.facKey, this.floorKey, this.floorTypeKey, this.zoneKey, this.roomTypeKey, RoomName)
  //       .subscribe((data: Inventory[]) => {
  //         if (data.length > 0) {
  //           alert("Room already present");
  //         } else {
  //           this.inventoryService
  //             .checkRoomBarcode(barcode)
  //             .subscribe((data: Inventory[]) => {
  //               if (data.length > 0) {
  //                 alert("Barcode already exists! Please enter a unique barcode.");
  //               } else {
  //                 this.inventoryService
  //                   .checkRoomName(RoomName)
  //                   .subscribe((data: Inventory[]) => {
  //                     if (data[0].count > 0) {
  //                       alert("Room Name already exists !");
  //                     } else {
  //                       this.inventoryService.addRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName, SquareFoot, Barcode)
  //                         .subscribe(res => this.router.navigateByUrl('/roomView'));
  //                     }
  //                   });
  //               }
  //             });
  //         }
  //       });
  //   }

  // }
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
