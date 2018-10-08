import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { Router ,ActivatedRoute} from "@angular/router";

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
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.roomKey$ = params.RoomKey);
  }

  ngOnInit() {

    this.inventoryService
      .getRoomDetailsList(this.roomKey$)
      .subscribe((data: Array<any>) => {
        this.room = data[0];
        this.facKey = data[0].FacilityKey;
        this.floorKey = data[0].FloorKey;
      });


    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });

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
