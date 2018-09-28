import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
  building: Inventory[];
  floor: Inventory[];
  zone: Inventory[];
  floorType: Inventory[];
  roomType: Inventory[];
  barcode: Inventory[];
  constructor(private inventoryService: InventoryService) { }

  selectFloorfromBuildings(facKey) {
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floor = data;
      });
  }

  selectZonefromFloor(facKey) {
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.zone = data;
      });
  }
  ngOnInit() {
    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });
    // this.inventoryService
    //   .getallFloorTypeList()
    //   .subscribe((data: Inventory[]) => {
    //     this.building = data;
    //   });
    // this.inventoryService
    //   .getallRoomTypeList()
    //   .subscribe((data: Inventory[]) => {
    //     this.building = data;
    //   });
    // this.inventoryService
    //   .getBarcodeForRoom()
    //   .subscribe((data: Inventory[]) => {
    //     this.building = data;
    //   });
  }

}
