import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  deptKey$: Object;
  dept: Inventory[]=[];


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {
    this.route.params.subscribe(params => this.deptKey$ = params.DeptKey);
  }

  updateDepartment(DepartmentName) {
    debugger;
    if (!DepartmentName) {
      alert("Please provide a Department Name");
    } else {
      this.inventoryService.checkForNewDepartment(DepartmentName).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (this.dept.length > 0) {
          alert("Department already present");
        }
        else if (data.length == 0) {
          this.inventoryService.UpdateDepartment(DepartmentName, this.deptKey$).subscribe(res => { console.log("Dept updated.....") });
        }
      });
    }
  }

  ngOnInit() {

    this.inventoryService.EditDepartment(this.deptKey$).subscribe((data: Inventory[]) => {
      debugger;
      this.dept = data;
    });
  }
}
