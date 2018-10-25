import { Component, OnInit } from '@angular/core';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-quick-work-order',
  templateUrl: './create-quick-work-order.component.html',
  styleUrls: ['./create-quick-work-order.component.scss']
})
export class CreateQuickWorkOrderComponent implements OnInit {
  EmployeeOption: workorder[];
  facilitylist: workorder[];
  emp_key: number;
  org_id: number;
  marked = false;
  prioritylist: workorder[];
  EmployeeKey;
  WorkorderNotes;
  FacilityKey;
  PriorityKey;
  isPhotoRequired;
  createworkorder;
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  priority;
  isReccuring;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyreccuringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;

  intervaltype;
  repeatinterval;
  occursonday;

  workorderCreation;

  constructor(private router: Router, private WorkOrderServiceService: WorkOrderServiceService) { }

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  saveQuickWorkOrder() {
    this.wot = - 1;
    this.startDT = this.convert_DT(new Date());
    var d = new Date();
    var datetext = d.toTimeString();
    datetext = datetext.split(' ')[0];
    this.workTime = datetext;
    this.is_BarcodeRequired = 0;
    var facilityString;

    if (this.WorkorderNotes) {
      this.notes = this.WorkorderNotes;
    } else if (!this.WorkorderNotes) {
      this.notes = null;
      alert("Work Order Notes is not provided !");
    }
    else if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else if (!this.FacilityKey) {
      alert("Building is not provided !");
    }
    else {
      if (this.EmployeeKey) {
        this.emp_key = this.EmployeeKey;
      } else {
        this.emp_key = - 1;
      }

      if (this.PriorityKey) {
        this.priority = this.PriorityKey;
      } else {
        this.priority = - 1;
      }

      if (this.isPhotoRequired) {
        this.is_PhotoRequired = 1;
      } else {
        this.is_PhotoRequired = 0;
      }
      this.createworkorder = {
        workorderkey: - 99,
        workordertypekey: - 1,
        equipmentkey: - 1,
        roomkeys: '-1',
        facilitykeys: facilityString,
        floorkeys: '-1',
        zonekeys: '-1',
        roomtypekeys: '-1',
        employeekey: this.emp_key,
        priority: this.priority,
        fromdate: this.startDT,
        todate: this.startDT,
        intervaltype: '0',
        repeatinterval: 1,
        occursonday: null,
        occursontime: this.workTime,
        occurstype: null,
        workordernote: this.notes,
        isbar: this.is_BarcodeRequired,
        isphoto: this.is_PhotoRequired,
        metaupdatedby: 2861,
        OrganizationID: 21
      };

      this.WorkOrderServiceService
        .addQuickWorkOrder(this.createworkorder)
        .subscribe(res => this.router.navigateByUrl('/viewWorkOrderSupervisor'));
    }
  }

  ngOnInit() {
    this.emp_key = 2861;
    this.org_id = 21;

    this.WorkOrderServiceService
      .getallEmployee(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });
    this.WorkOrderServiceService
      .getallFacility(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService
      .getallPriority(this.org_id)
      .subscribe((data: any[]) => {
        this.prioritylist = data;
      });
  }

}
