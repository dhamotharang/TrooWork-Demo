import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';

@Component({
  selector: 'app-view-batch-workorder',
  templateUrl: './view-batch-workorder.component.html',
  styleUrls: ['./view-batch-workorder.component.scss']
})
export class ViewBatchWorkorderComponent implements OnInit {
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
  EmployeeOption: workorder[];
  facilitylist: workorder[];
  scheduleList: workorder[];
  FloorList: workorder[];
  zonelist: workorder[];
  RoomTypeList: workorder[];
  workStatusList: workorder[];
  workorderTypeList: workorder[];
  RoomList: workorder[];
  domain_name: string;
  workorderList;
  checkValue = [];
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  BatchScheduleNameKey;
  WorkorderStatusKey;
  EmployeeKey;
  WorkorderTypeKey;
  ondate: Date;
  todate: Date;
  viewWorkOrder;
  isRecurring = false;
  marked = false;
  workorderKey = [];
  searchWorkorder;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  pageno: Number = 1;
  items_perpage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  // workorderCheckValue=false;
  //validation min3_alphanumeric
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }
  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)

  }
  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    this.domain_name = 'workstatus';
    this.FacilityKey="";
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
    this.EmployeeKey="";
    this.WorkorderTypeKey="";
    this.BatchScheduleNameKey="";
    var on_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getallFacility(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService
      .getallEmployeeName(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });
    this.WorkOrderServiceService
      .getallScheduleName(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.scheduleList = data;
      });
    this.WorkOrderServiceService
      .getallworkStatus(this.domain_name, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workStatusList = data;
      });
    this.WorkOrderServiceService
      .getallworkorderType(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
    this.WorkOrderServiceService
      .getBatchworkorder(on_date, this.employeekey, this.pageno, this.items_perpage, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderList = data;
      });
   

    // this.searchform = this.formBuilder.group({
    //   SearchworkType_emp_room: ['', Validators.required]
    // }); 

    this.searchform = this.formBuilder.group({
      SearchWo: ['', Validators.required]
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
  
    this.WorkOrderServiceService
      .getallFloor(facilityName, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.FloorList = data;
      });
  }
  getZoneRoomTypeRoom(floor, facility) {
    this.WorkOrderServiceService
      .getzone_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.zonelist = data;
      });
    this.WorkOrderServiceService
      .getroomType_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  getRoomTypeRoom(zone, facility, floor) {
    this.WorkOrderServiceService
      .getRoomtype_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  getRoom(roomtype, zone, facility, floor) {
    this.WorkOrderServiceService
      .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  viewWO_Filter() {
   
    if (!this.FacilityKey) {
      var fac_key = null;

    }
    else {
      fac_key = this.FacilityKey
    }
    if (!this.FloorKey) {
      var floor_key = null;

    }
    else {
      floor_key = this.FloorKey
    }
    if (!this.ZoneKey) {
      var zone_key = null;

    }
    else {
      zone_key = this.ZoneKey
    }
    if (!this.RoomTypeKey) {
      var roomtype_key = null;

    }
    else {
      roomtype_key = this.RoomTypeKey
    }
    if (!this.RoomKey) {
      var room_key = null;

    }
    else {
      room_key = this.RoomKey
    }
    if (!this.BatchScheduleNameKey) {
      var batch_key = null;

    }
    else {
      batch_key = this.BatchScheduleNameKey
    }
    if (!this.WorkorderStatusKey) {
      var WOS_key = null;

    }
    else {
      WOS_key = this.WorkorderStatusKey
    }
    if (!this.EmployeeKey) {
      var em_key = null;

    }
    else {
      em_key = this.EmployeeKey;
    }
    if (!this.WorkorderTypeKey) {
      var wot_key = null;

    }
    else {
      wot_key = this.WorkorderTypeKey;
    }
    if (!this.ondate) {
      var from_date = this.convert_DT(new Date());

    }
    else {
      from_date = this.convert_DT(this.ondate);
    }
    if (!this.todate) {
      var to_date = this.convert_DT(new Date());

    }
    else {
      to_date = this.convert_DT(this.todate);
    }
    this.viewWorkOrder = {
      manager: 2861,
      workorderStatusKey: WOS_key,
      workorderDate: from_date,
      workorderDate2: to_date,
      facilitykey: fac_key,
      roomTypeKey: roomtype_key,
      roomKey: room_key,
      zoneKey: zone_key,
      employeekey: em_key,
      workorderTypeKey: wot_key,
      BatchScheduleNameKey: batch_key,
      OrganizationID: this.OrganizationID,
      floorKey: floor_key
    };
    this.WorkOrderServiceService
      .getBatchWoFilter(this.viewWorkOrder)
      .subscribe((data: any[]) => {
        this.workorderList = data;
      });
  }
  searchBatchWo(search_value) {
    if (!this.FacilityKey) {
      var fac_key = null;

    }
    else {
      fac_key = this.FacilityKey
    }
    if (!this.FloorKey) {
      var floor_key = null;

    }
    else {
      floor_key = this.FloorKey
    }
    if (!this.ZoneKey) {
      var zone_key = null;

    }
    else {
      zone_key = this.ZoneKey
    }
    if (!this.RoomTypeKey) {
      var roomtype_key = null;

    }
    else {
      roomtype_key = this.RoomTypeKey
    }
    if (!this.RoomKey) {
      var room_key = null;

    }
    else {
      room_key = this.RoomKey
    }
    if (!this.BatchScheduleNameKey) {
      var batch_key = null;

    }
    else {
      batch_key = this.BatchScheduleNameKey
    }
    if (!this.WorkorderStatusKey) {
      var WOS_key = null;

    }
    else {
      WOS_key = this.WorkorderStatusKey
    }
    if (!this.EmployeeKey) {
      var em_key = null;

    }
    else {
      em_key = this.EmployeeKey;
    }
    if (!this.WorkorderTypeKey) {
      var wot_key = null;

    }
    else {
      wot_key = this.WorkorderTypeKey;
    }
    if (!this.ondate) {
      var from_date = this.convert_DT(new Date());

    }
    else {
      from_date = this.convert_DT(this.ondate);
    }
    if (!this.todate) {
      var to_date = this.convert_DT(new Date());

    }
    else {
      to_date = this.convert_DT(this.todate);
    }
    this.searchWorkorder = {
      manager: 2861,
      workorderStatusKey: WOS_key,
      workorderDate: from_date,
      workorderDate2: to_date,
      facilitykey: fac_key,
      roomTypeKey: roomtype_key,
      roomKey: room_key,
      zoneKey: zone_key,
      employeekey: em_key,
      workorderTypeKey: wot_key,
      BatchScheduleNameKey: batch_key,
      OrganizationID: this.OrganizationID,
      floorKey: floor_key,
      searchWO: search_value
    };
    if(search_value.length>=3)
    {
    this.WorkOrderServiceService
      .search_Batch_WO(this.searchWorkorder)
      .subscribe((data: any[]) => {
      
        this.workorderList = data;
      });
    }
    else if(search_value.length==0)
    {
      var on_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
      .getBatchworkorder(on_date, this.employeekey, this.pageno, this.items_perpage, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderList = data;
      });
    }
  }

}
