import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router } from "@angular/router";
@Component({
  selector: 'app-floor-edit',
  templateUrl: './floor-edit.component.html',
  styleUrls: ['./floor-edit.component.scss']
})
export class FloorEditComponent implements OnInit {
  facKey$: Object;
  floorKey$: Object;
  flooroptions: Inventory[];
  buildingList: Inventory[];
  constructor(private route: ActivatedRoute,private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.facKey$ = params.Facility_Key);
    this.route.params.subscribe(params => this.floorKey$ = params.Floor_Key);
   }

  updateFloor(FacilityKey,
    FloorKey,FloorName,FloorDescription) {

    this.inventoryService
    .UpdateFloor(FacilityKey,FloorKey,FloorName,FloorDescription)
    .subscribe((data: Inventory[]) => { 
      alert("Floor updated successfully");
      this.router.navigateByUrl('/Floorview');
    });
  }
  ngOnInit() {
    this.inventoryService
    .getallBuildingList()
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.buildingList = data;
    });
    this.inventoryService.EditFloorAutoGenerate(this.floorKey$,this.facKey$).subscribe((data: Inventory[]) => {
      this.flooroptions = data;
      debugger;
    });
  }

}
