import {  Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';

@Component({
  selector: 'app-create-workorder',
  templateUrl: './create-workorder.component.html',
  styleUrls: ['./create-workorder.component.scss']
})
export class CreateWorkorderComponent implements OnInit {
  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");

  }

  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());
  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;

  }

  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) { }
  EmployeeOption: workorder[];
  workorderTypeList:workorder[];
  facilitylist: workorder[];
  FloorList:workorder[];
  zonelist:workorder[];
  RoomTypeList:workorder[];
  RoomList:workorder[];
  priorityList:workorder[];
  EquipmentList:workorder[];
  emp_key:number;
  org_id:number;
  marked = false;
  ngOnInit() {
    this.emp_key=2861;
    this.org_id=21;
    this.WorkOrderServiceService
    .getallFacility(this.emp_key, this.org_id)
    .subscribe((data: any[]) => {
      this.facilitylist = data;
    });
    this.WorkOrderServiceService
      .getallworkorderType(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
      this.WorkOrderServiceService
      .getallPriority(this.org_id)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });
      this.WorkOrderServiceService
      .getallEmployee(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  getEquiment(floor_key,facility_key)
  {
    this.WorkOrderServiceService
    .getallEquipment(floor_key,facility_key, this.org_id)
    .subscribe((data: any[]) => {
      this.EquipmentList = data;
    });
  }
  getFloorDisp(facilityName)
  {
    debugger;
    this.WorkOrderServiceService
      .getallFloor(facilityName,this.org_id)
      .subscribe((data: any[]) => {
        this.FloorList = data;
      });
  }

}
