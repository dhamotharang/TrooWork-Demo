import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
@Component({
  selector: 'app-view-work-orders',
  templateUrl: './view-work-orders.component.html',
  styleUrls: ['./view-work-orders.component.scss']
})
export class ViewWorkOrdersComponent implements OnInit {
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
  emp_key: number;
  org_id: number;
  domain_name: string;
  workorderList: workorder[];
  checkValue = [];
  FacilityKey: number;
  FloorKey: number;
  ZoneKey: number;
  RoomTypeKey: number;
  RoomKey: number;
  BatchScheduleNameKey: number;
  WorkorderStatusKey: number;
  EmployeeKey: number;
  WorkorderTypeKey: number;
  ondate: Date;
  todate: Date;
  viewWorkOrder;
  isRecurring = false;
  marked = false;
  workorderKey = [];
  DeleteWOList: workorder[];
  deleteWO;
  searchWorkorder;
  workorderCheckValue=false;
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
    this.emp_key = 2861;
    this.org_id = 21;
    this.domain_name = 'workstatus';
    var on_date = this.convert_DT(new Date());
    var page_no = 1;
    var iems_perpage = 25;
    this.WorkOrderServiceService
      .getallFacility(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService
      .getallEmployeeName(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });
    this.WorkOrderServiceService
      .getallScheduleName(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.scheduleList = data;
      });
    this.WorkOrderServiceService
      .getallworkStatus(this.domain_name, this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.workStatusList = data;
      });
    this.WorkOrderServiceService
      .getallworkorderType(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
    this.WorkOrderServiceService
      .getworkorder(on_date, this.emp_key, page_no, iems_perpage, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderList = data;
      });
    debugger;

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
  viewWO_Filter() {
    debugger;
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
      OrganizationID: this.org_id,
      floorKey: floor_key
    };
    this.WorkOrderServiceService
      .getWoFilter(this.viewWorkOrder)
      .subscribe((data: any[]) => {
        this.workorderList = data;
      });
  }
  checkBoxValueForDelete(index, CheckValue, WorkorderKey) {
    debugger;
    this.checkValue[index] = CheckValue;
    this.workorderKey[index] = WorkorderKey;
  }
  searchworkType_emp_room(search_value) {
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
      OrganizationID: this.org_id,
      floorKey: floor_key,
      searchWO: search_value
    };
    this.WorkOrderServiceService
      .search_WO(this.searchWorkorder)
      .subscribe((data: any[]) => {
        debugger;
        this.workorderList = data;
      });
  }
  deleteWorkOrdersPage() {
    debugger;
    var deleteWorkOrderList = [];
    var deleteWorkOrderString;

    if (this.checkValue.length > 0) {
      for (var j = 0; j < this.checkValue.length; j++) {
        if (this.checkValue[j] === true)
          deleteWorkOrderList.push(this.workorderKey[j]);
      }
      deleteWorkOrderString = deleteWorkOrderList.join(',');
    }
    this.deleteWO = {
      deleteWorkOrderString: deleteWorkOrderString,
      employeekey: this.emp_key,
      OrganizationID: this.org_id
    };
    this.WorkOrderServiceService
      .delete_WO(this.deleteWO)
      .subscribe((data: any[]) => {
        // this.DeleteWOList = data; 
        this.workorderCheckValue=false;
        this.checkValue=[];
        this.workorderKey=[];
        this.viewWO_Filter();
      });
  }

}
