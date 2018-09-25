import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {
  facKey$: Object;
  floorKey$: Object;
  zoneKey$: Object;

  floorList: Inventory[];
  buildingList: Inventory[];
  zoneEditValues: Inventory[];

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {
    this.route.params.subscribe(params => this.facKey$ = params.Facility_Key);
    this.route.params.subscribe(params => this.floorKey$ = params.Floor_Key);
    this.route.params.subscribe(params => this.zoneKey$ = params.Zone_Key);
  }

  // updateFloor(FacilityKey,
  //   FloorKey, FloorName, FloorDescription) {
  //   this.inventoryService.UpdateFloor(FacilityKey, FloorKey, FloorName, FloorDescription);
  // }
  ngOnInit() {
    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.buildingList = data;
      });

    this.inventoryService
      .getallFloorList(this.facKey$)
      .subscribe((data: Inventory[]) => {
        // debugger;
        this.floorList = data;
      });

    this.inventoryService.EditZoneAutoGenerate(this.zoneKey$).subscribe((data: Inventory[]) => {
      this.zoneEditValues = data;
      debugger;
    });
  }
}
