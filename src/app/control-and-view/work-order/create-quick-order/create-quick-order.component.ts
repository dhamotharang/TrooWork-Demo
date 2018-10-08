import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';

@Component({
  selector: 'app-create-quick-order',
  templateUrl: './create-quick-order.component.html',
  styleUrls: ['./create-quick-order.component.scss']
})
export class CreateQuickOrderComponent implements OnInit {
  EmployeeOption: workorder[];
  facilitylist:workorder[];
  emp_key:number;
  org_id:number;
  marked = false;
  prioritylist:workorder[];
  constructor(private fb: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) { }

  ngOnInit() {
    this.emp_key=2861;
    this.org_id=21;
    
    this.WorkOrderServiceService
    .getallEmployee(this.emp_key,this.org_id)
    .subscribe((data:any[]) => {
      this.EmployeeOption = data;
    });
    this.WorkOrderServiceService
    .getallFacility(this.emp_key,this.org_id)
    .subscribe((data:any[]) => {
      this.facilitylist = data;
    });
    this.WorkOrderServiceService
    .getallPriority(this.org_id)
    .subscribe((data:any[]) => {
      this.prioritylist = data;
    });
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked= true;
    } else {
      this.marked = false;
    }
  }

}
