import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  deptKey$: Object;
  //dept: Inventory[];
  dept: Array<any>;


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.deptKey$ = params.DeptKey);
  }

  updateDepartment(DepartmentName) {
    debugger;
    if (!DepartmentName) {
      alert("Please provide a Department Name");
    } else {
      this.inventoryService.checkForNewDepartment(DepartmentName).subscribe((data: Array<any>) => {
        // this.dept = data;
        if (data.length > 0) {
          alert("Department already present");
        }
        else {
          this.inventoryService.UpdateDepartment(DepartmentName, this.deptKey$).subscribe(res => this.router.navigateByUrl('/DepartmentView'));
        }
      });
    }
  }

  ngOnInit() {

    this.inventoryService.EditDepartment(this.deptKey$).subscribe((data: Array<any>) => {
      debugger;
      this.dept = data[0];
    });
  }
}
