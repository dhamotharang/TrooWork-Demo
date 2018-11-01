import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../../../../model-class/Inventory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../../../../service/inventory.service';
@Component({
  selector: 'app-floor-create',
  templateUrl: './floor-create.component.html',
  styleUrls: ['./floor-create.component.scss']
})
export class FloorCreateComponent implements OnInit {

  flooroptions: Inventory[];
  floorcreate: FormGroup; constructor(private router: Router, private fb: FormBuilder, private inventoryService: InventoryService) {

    this.floorcreate = fb.group({
      FacilityKey: ['', Validators.required],
      FloorName: ['', Validators.required],
      FloorDescription: ['', Validators.required]
    });
  }

  // floorOptionsDd()
  // {

  // }
  addFloor(FacilityKey, FloorName, FloorDescription) {
    if (!FacilityKey) {
      alert("Please select a building name!");
    } else if (!FloorName) {
      alert("Enter floor name!");
    }
    else if (!FloorDescription) {
      alert("Enter floor description!");
    }
    else {

      this.inventoryService.createFloors(FacilityKey, FloorName, FloorDescription)
        .subscribe((data: Inventory[]) => {
          alert("Floor created successfully");
          this.router.navigateByUrl('/Floorview');
        });
    }
  }

  ngOnInit() {

    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        // debugger;
        this.flooroptions = data;
      });
  }

}
