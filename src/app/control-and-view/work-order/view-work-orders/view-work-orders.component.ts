import {  Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
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
  scheduleList:workorder[];
  FloorList:workorder[];
  zonelist:workorder[];
  RoomTypeList:workorder[];
  workStatusList:workorder[];
  workorderTypeList:workorder[];
  RoomList:workorder[];
  emp_key:number;
  org_id:number;
  domain_name:string;
  //validation starts
  // searchform: FormGroup;
  // regexStr = '^[a-zA-Z0-9_ ]*$';
  // @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService,private el: ElementRef) { }
  // @HostListener('keypress', ['$event']) onKeyPress(event) {
  //   return new RegExp(this.regexStr).test(event.key);
  // }

  // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  //   this.validateFields(event);
  // }
  // validateFields(event) {
  //   setTimeout(() => {

  //     this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
  //     event.preventDefault();

  //   }, 100)
    
  // }
  ngOnInit() {
    this.emp_key=2861;
    this.org_id=21;
    this.domain_name='workstatus';
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
      .getallworkStatus(this.domain_name,this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.workStatusList = data;
      });
      this.WorkOrderServiceService
      .getallworkorderType(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
      // this.searchform = this.formBuilder.group({
      //   SearchworkType_emp_room: ['', Validators.required]
      // }); 
     
      
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
  getZoneRoomTypeRoom(floor,facility)
  {
    this.WorkOrderServiceService
    .getzone_facilityfloor(floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.zonelist = data;
    });
    this.WorkOrderServiceService
    .getroomType_facilityfloor(floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.RoomTypeList = data;
    });
    this.WorkOrderServiceService
    .getRoom_facilityfloor(floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.RoomList = data;
    });
  }
  getRoomTypeRoom(zone,facility,floor)
  {
    this.WorkOrderServiceService
    .getRoomtype_zone_facilityfloor(zone,floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.RoomTypeList = data;
    });
    this.WorkOrderServiceService
    .getRoom_zone_facilityfloor(zone,floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.RoomList = data;
    });
  }
  getRoom(roomtype,zone,facility,floor)
  {
    this.WorkOrderServiceService
    .getRoom_Roomtype_zone_facilityfloor(roomtype,zone,floor,facility,this.org_id)
    .subscribe((data: any[]) => {
      this.RoomList = data;
    });
  }

}
