import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../model-class/Inventory';
import { InventoryService } from '../../../service/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})
export class DepartmentCreateComponent implements OnInit {
  dept: Inventory[];
  createbuilding: FormGroup;
  constructor(private fb: FormBuilder, private inventoryServ: InventoryService, private router: Router) {
    // this.createbuilding = fb.group({
    //   DepartmentName: ['', Validators.required]
    // });
  }

  addDepartment(DepartmentName) {
    if (!DepartmentName) {
      alert("Please provide a Department Name");
    } else {
      this.inventoryServ.checkForNewDepartment(DepartmentName).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (data.length > 0) {
          alert("Department already present");
        }
        else if (data.length == 0) {
          this.inventoryServ.addDepartment(DepartmentName).subscribe(res => this.router.navigateByUrl('/DepartmentView'));
        }
      });
    }
  }

  ngOnInit() {
  }

}
