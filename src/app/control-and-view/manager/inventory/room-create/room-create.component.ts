import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
  building: Inventory[];
  FaciKey: Number;
  FloorKey: Number;
  floor: Inventory[];
  zone: Inventory[];
  floorType: Inventory[];
  roomType: Inventory[];
  Barcode: Array<any>;
  FacilityKey;
  FloorTypeKey;
  ZoneKey;
  RoomTypeKey;
  RoomName;
  SquareFoot;
  temp_barcode;
  constructor(private inventoryService: InventoryService, private router: Router) { }

  selectFloorfromBuildings(facKey) {
    this.FaciKey = facKey;
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floor = data;
      });
  }

  selectZonefromFloor(flrKey) {
    this.FloorKey = flrKey;
    this.inventoryService
      .getallZoneList(this.FaciKey, flrKey)
      .subscribe((data: Inventory[]) => {
        this.zone = data;
      });
  }
  addRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName, SquareFoot, Barcode) {
    // if(FacilityKey&& FloorKey&& FloorTypeKey&& ZoneKey&& RoomTypeKey&& RoomName)
    // {
    //   this.inventoryService
    //   .checkNewRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName)
    //   .subscribe((data: Inventory[]) => {
    //     var temp1=data;
    //   });
    // }
    // if(Barcode)
    // {
    //   this.inventoryService
    //           .checkRoomBarcode(Barcode)
    //           .subscribe((data: Inventory[]) => {
    //             var temp2=data;
    //           });
    // }
    // if(RoomName)
    // {
    //   this.inventoryService
    //                 .checkRoomName(RoomName)
    //                 .subscribe((data: Inventory[]) => {
    //                   var temp3=data;
    //                 }); 
    // }

    if (!FacilityKey) {
      FacilityKey = null;
      alert("Building name is not provided !");
    } else if (!FloorKey) {
      FloorKey = null;
      alert("Floor name is not provided!");
    } else if (!FloorTypeKey) {
      FloorTypeKey = null;
      alert("FloorType is not provided !");
    } else if (!ZoneKey) {
      ZoneKey = null;
      alert("Zone name is not provided !");
    } else if (!RoomTypeKey) {
      RoomTypeKey = null;
      alert("RoomType is not provided !");
    } else if (!RoomName) {
      RoomName = null;
      alert("Room name is not provided !");
    } else if (!SquareFoot) {
      SquareFoot = null;
      alert("SquareFoot is not provided !");
    } else if (!Barcode) {
      Barcode = null;
      alert("Barcode is not provided !");
    } else {
      this.inventoryService
        .checkNewRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName)
        .subscribe((data: Inventory[]) => {
          if (data.length > 0) {
            alert("Room already present");
          } else {
            this.inventoryService
              .checkRoomBarcode(Barcode)
              .subscribe((data: Inventory[]) => {
                if (data.length > 0) {
                  alert("Barcode already exists! Please enter a unique barcode.");
                } else {
                  this.inventoryService
                    .checkRoomName(RoomName)
                    .subscribe((data: Inventory[]) => {
                      if (data[0].count > 0) {
                        alert("Room Name already exists !");
                      } else {
                        this.inventoryService.addRoom(FacilityKey, FloorKey, FloorTypeKey, ZoneKey, RoomTypeKey, RoomName, SquareFoot, Barcode)
                          .subscribe(res => {
                            alert("Room created successfully");
                            this.router.navigateByUrl('/roomView');
                          });
                      }
                    });
                }
              });
          }
        });
    }


  }
  ngOnInit() {
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
    this.inventoryService
      .getBarcodeForRoom()
      .subscribe((data: Array<any>) => {
        this.Barcode = data[0];
        this.temp_barcode = data[0];
      });
  }
  clearall() {
    this.FacilityKey = null;
    this.FloorKey = null;
    this.FloorTypeKey = null;
    this.RoomTypeKey = null;
    this.ZoneKey = null;
    this.RoomName = null;
    this.SquareFoot = null;
    this.Barcode = this.temp_barcode;

  }

}
