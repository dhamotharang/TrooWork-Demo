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
  loading: boolean;// loading
  EmployeeOption: workorder[];
  facilitylist: workorder[];
  scheduleList: workorder[];
  FloorList: workorder[];
  zonelist: workorder[];
  RoomTypeList: workorder[];
  workStatusList: workorder[];
  workorderTypeList;
  RoomList: workorder[];
  emp_key: number;
  org_id: number;
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
  DeleteWOList: workorder[];
  deleteWO;
  searchWorkorder;
  role: String;
  name: String;
  IsSupervisor: Number;
  pageno: Number = 1;
  items_perpage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  // workorderCheckValue=false;
  //validation min3_alphanumeric
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }

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
  previousPage() {
    var on_date = this.convert_DT(new Date());
    this.pageno = +this.pageno - 1;
    this.WorkOrderServiceService
      .getworkorder(on_date, this.emp_key, this.pageno, this.items_perpage, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderList = data;
        for (var i = 0; i < this.workorderList.length; i++) {
          this.workorderList[i].workorderCheckValue = false;
        }
        if (this.pageno == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  nextPage() {
    var on_date = this.convert_DT(new Date());
    this.pageno = +this.pageno + 1;
    this.WorkOrderServiceService
      .getworkorder(on_date, this.emp_key, this.pageno, this.items_perpage, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderList = data;
        for (var i = 0; i < this.workorderList.length; i++) {
          this.workorderList[i].workorderCheckValue = false;
        }
        this.pagination = +this.workorderList[0].totalItems / (+this.pageno * (+this.items_perpage));
        if (this.pagination > 1) {
          this.showHide2 = true;
          this.showHide1 = true;
        }
        else {
          this.showHide2 = false;
          this.showHide1 = true;
        }
      });
  }
  ngOnInit() {
    this.loading = true;
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.emp_key = profile.employeekey;
    this.org_id = profile.OrganizationID;
    this.domain_name = 'workstatus';
    var on_date = this.convert_DT(new Date());
    this.WorkorderTypeKey = "";
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.EmployeeKey = "";
    this.WorkorderStatusKey = "";
    this.BatchScheduleNameKey = "";
    this.ondate = new Date(Date.now());
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
      .getworkorder(on_date, this.emp_key, this.pageno, this.items_perpage, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderList = data;
        this.loading = false;
        for (var i = 0; i < this.workorderList.length; i++) {
          this.workorderList[i].workorderCheckValue = false;
        }
        if (this.workorderList[0].totalItems > this.items_perpage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.workorderList[0].totalItems <= this.items_perpage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        // this.loading = false;// loading
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

    this.loading = true;
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
        if (this.workorderList[0].totalItems > this.items_perpage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.workorderList[0].totalItems <= this.items_perpage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        this.loading = false;
      });
  }
  checkBoxValueForDelete(index, CheckValue, WorkorderKey) {

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
    if (search_value.length >= 3) {
      this.WorkOrderServiceService
        .search_WO(this.searchWorkorder)
        .subscribe((data: any[]) => {

          this.workorderList = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    }
    else if (search_value.length == 0) {
      var on_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getworkorder(on_date, this.emp_key, this.pageno, this.items_perpage, this.org_id)
        .subscribe((data: any[]) => {
          this.workorderList = data;
          if (this.workorderList[0].totalItems > this.items_perpage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.workorderList[0].totalItems <= this.items_perpage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  }
  deleteWorkOrdersPage() {

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
        this.workorderList.workorderCheckValue = false;
        this.checkValue = [];
        this.workorderKey = [];
        alert("work order deleted successfully");
        this.viewWO_Filter();

      });
  }

}
