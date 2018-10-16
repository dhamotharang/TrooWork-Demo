import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-edit-work-order',
  templateUrl: './edit-work-order.component.html',
  styleUrls: ['./edit-work-order.component.scss']
})
export class EditWorkOrderComponent implements OnInit {
  WO_Key:object;
  emp_key:number;
  org_id:number;
  EmployeeOption: workorder[];
  workorderTypeList: workorder[];
  facilitylist: workorder[];
  FloorList: workorder[];
  zonelist: workorder[];
  RoomTypeList: workorder[];
  RoomList: workorder[];
  priorityList: workorder[];
  EquipmentList: workorder[];
  EquipmentTypeList: workorder[];
  WOEditList;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  marked=false;
  dateValue:Date;
  showEqTypes=false;
  timeValue;

  constructor(private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) { 
    this.route.params.subscribe(params => this.WO_Key = params.WorkorderKey);
  }
  
  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());

  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  ngOnInit() {
    this.emp_key = 2861;
    this.org_id = 21;
    this.WorkOrderServiceService
      .getWO_edit(this.WO_Key, this.org_id)
      .subscribe((data: any[]) => {
        this.WOEditList = data[0];
        this.WorkOrderServiceService
        .getallFloor(this.WOEditList.FacilityKey, this.org_id)
        .subscribe((data: any[]) => {
          this.FloorList = data;
        });
        this.WorkOrderServiceService
      .getzone_facilityfloor(this.WOEditList.FloorKey,this.WOEditList.FacilityKey,this.org_id)
      .subscribe((data: any[]) => {
        this.zonelist = data;
      });
    this.WorkOrderServiceService
      .getroomType_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_facilityfloor(this.WOEditList.FloorKey,this.WOEditList.FacilityKey,  this.org_id)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
      if(this.WOEditList.EquipmentKey==-1) 
      {
        this.showEqTypes=false;
      }
      else
      {       
        this.showEqTypes=true;
        this.WorkOrderServiceService
      .getallEquipment(this.WOEditList.FacilityKey, this.WOEditList.FloorKey, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentTypeList = data;
        this.EquipmentList = data;
      });
      }
      if(this.WOEditList.IsPhotoRequired==1)
      {
        this.isPhotoRequired=true;
      }
      else{
        this.isPhotoRequired=false;
      }
      if(this.WOEditList.IsBarcodeRequired==1)
      {
        this.isBarcodeRequired=true;
      }
      else{
        this.isBarcodeRequired=false;
      }
      this.dateValue=new Date(this.WOEditList.WorkorderDate);
      this.timeValue=this.WOEditList.WorkorderTime;
      });
      
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
  getFloorDisp(facilityName) {
    debugger;
    this.WorkOrderServiceService
      .getallFloor(facilityName, this.org_id)
      .subscribe((data: any[]) => {
        this.FloorList = data;
      });
  }
  getZoneRoomTypeRoom(floor, facility) {
    this.WorkOrderServiceService
      .getzone_facilityfloor(floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.zonelist = data;
      });
    this.WorkOrderServiceService
      .getroomType_facilityfloor(floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_facilityfloor(floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  getRoomTypeRoom(zone, facility, floor) {
    this.WorkOrderServiceService
      .getRoomtype_zone_facilityfloor(zone, floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_zone_facilityfloor(zone, floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  getRoom(roomtype, zone, facility, floor) {
    this.WorkOrderServiceService
      .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.org_id)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  showEquipment_typechange(equip_type, facility, floor) {
    this.WorkOrderServiceService
      .getEquipment_typechange(equip_type, facility, floor, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentList = data;
      });
  }
  getEquiment(floor_key, facility_key) {
    this.WorkOrderServiceService
      .getallEquipment(floor_key, facility_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentTypeList = data;
        this.EquipmentList = data;
      });
  }

}
