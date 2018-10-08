import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../model-class/Inventory';
import { InventoryService } from '../../../service/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-floor-type-create',
  templateUrl: './floor-type-create.component.html',
  styleUrls: ['./floor-type-create.component.scss']
})
export class FloorTypeCreateComponent implements OnInit {
  flrType: Inventory[];
  constructor(private fb: FormBuilder, private inventoryServ: InventoryService, private router: Router) {
  }

  addFloorType(FloorTypeName) {
    if (!FloorTypeName) {
      alert("Please provide a Department Name");
    } else {
      this.inventoryServ.checkForNewFloorType(FloorTypeName).subscribe((data: Inventory[]) => {
        this.flrType = data;
        if (data.length > 0) {
          alert("Floor Type already present");
        }
        else if (data.length == 0) {
          this.inventoryServ.addNewFloorType(FloorTypeName).subscribe(res => this.router.navigateByUrl('/FloorTypeView'));
        }
      });
    }
  }

  ngOnInit() {
  }


}
