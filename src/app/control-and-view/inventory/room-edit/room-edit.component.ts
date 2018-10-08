import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
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
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.roomKey$ = params.RoomKey);
  }

  selectFloorfromBuildings(facKey) {
    this.facKey = facKey;
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floor = data;
      });
  }

  selectZonefromFloor(flrKey) {
    this.floorKey = flrKey;
    this.inventoryService
      .getallZoneList(this.facKey, flrKey)
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

    this.inventoryService
      .getRoomDetailsList(this.roomKey$)
      .subscribe((data: Array<any>) => {
        this.room = data[0];
        this.facKey = data[0].FacilityKey;
        this.floorKey = data[0].FloorKey;
        this.zoneKey = data[0].FloorKey;

        this.inventoryService
          .getallFloorList(this.facKey)
          .subscribe((data: Inventory[]) => {
            this.floor = data;
          });
        this.inventoryService
          .getallZoneList(this.facKey, this.floorKey)
          .subscribe((data: Inventory[]) => {
            this.zone = data;
          });
      });


    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });

    this.inventoryService
      .getallFloorTypeList()
      .subscribe((data: Inventory[]) => {
        this.floorType = data;
      });
    this.inventoryService
      .getallRoomTypeList()
      .subscribe((data: Inventory[]) => {
        this.roomType = data;
      });
  }
}
