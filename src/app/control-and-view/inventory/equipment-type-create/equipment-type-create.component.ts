import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../model-class/Inventory';
import { InventoryService } from '../../../service/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-equipment-type-create',
  templateUrl: './equipment-type-create.component.html',
  styleUrls: ['./equipment-type-create.component.scss']
})
export class EquipmentTypeCreateComponent implements OnInit {
  dept: Inventory[];
  // createbuilding: FormGroup;
  EquipmentTypeName: String;
  EquipmentTypeDescription: String;
  constructor(private fb: FormBuilder, private inventoryServ: InventoryService, private router: Router) {
    // this.createbuilding = fb.group({
    //   DepartmentName: ['', Validators.required]
    // });
  }

  addEquipmentType() {
    if (!this.EquipmentTypeName) {
      alert("Please provide a Equipment Type");
    } else if (!this.EquipmentTypeDescription) {
      alert("Please provide a Equipment Type Description");
    } else {
      this.inventoryServ.checkForNewEquipmentType(this.EquipmentTypeName).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (this.dept[0].count > 0) {
          alert("Equipment Type already present");
        }
        else if (this.dept[0].count == 0) {
          this.inventoryServ.addEquipmentType(this.EquipmentTypeName, this.EquipmentTypeDescription).subscribe(res => this.router.navigateByUrl('/EquipmentTypeView'));
        }
      });
    }
  }

  ngOnInit() {
  }

}
