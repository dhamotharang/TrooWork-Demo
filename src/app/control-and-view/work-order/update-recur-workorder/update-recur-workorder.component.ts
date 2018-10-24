import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-recur-workorder',
  templateUrl: './update-recur-workorder.component.html',
  styleUrls: ['./update-recur-workorder.component.scss']
})
export class UpdateRecurWorkorderComponent implements OnInit {
  WO_Key: object;
  emp_key: number;
  org_id: number;
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
  floorvalue;
  WOEditList;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  marked = false;
  dateValue: Date;
  showEqTypes = false;
  WorkorderNotes;
  workordertypekey;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  PriorityKey;
  EquipmentTypeKey;
  EquipmentKey;
  EmployeeKey;
  timeValue;
  deleteWO;
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  priority;
  isRecurring;
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
  timetable = { times: [] };
  monthlyDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  recurringFrequency = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekPosition = [{ id: 'First', value: '1' }, { id: 'Second', value: '2' }, { id: 'Third', value: '3' }, { id: 'Fourth', value: '4' }, { id: 'Fifth', value: '5' }, { id: 'Last', value: '-1' }];
  dailyrecurring;
  dailyFrequency: number;
  WorkorderStartDate;
  WorkorderEndDate;
  occurenceat;
  DailyrecurringGap = 0;
  rep_interval = 1;
  occurs_on = null;
  weektable_one;
  weektable_two;
  weektable_three;
  weektable_four;
  weektable_five;
  weektable_six;
  weektable_seven;
  Time_weekly;
  Time_monthly;
  day1;
  month1;
  day2;
  month2;
  occurs_type;
  pos2;
  weeklyrecurring;
  monthlyrecurring;
  monthlyreccradio1;
  monthlyreccradio2;


  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) {
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
          .getzone_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.org_id)
          .subscribe((data: any[]) => {
            this.zonelist = data;
          });
        this.WorkOrderServiceService
          .getroomType_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.org_id)
          .subscribe((data: any[]) => {
            this.RoomTypeList = data;
          });
        this.WorkOrderServiceService
          .getRoom_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.org_id)
          .subscribe((data: any[]) => {
            this.RoomList = data;
          });
        debugger;
        if (this.WOEditList.EquipmentKey == -1) {
          this.showEqTypes = false;
          this.FloorKey = this.WOEditList.FloorKey;
          this.RoomTypeKey = this.WOEditList.RoomTypeKey;
        }
        else {
          this.showEqTypes = true;
          this.RoomTypeKey = null;

          this.WorkOrderServiceService
            .getFloor(this.WO_Key, this.org_id)
            .subscribe((data: any[]) => {
              debugger;
              this.floorvalue = parseInt(data[0].FloorKeyList);
              this.FloorKey = this.floorvalue;
              this.WorkOrderServiceService
                .getallEquipment(this.WOEditList.FacilityKey, this.floorvalue, this.org_id)
                .subscribe((data: any[]) => {
                  this.EquipmentTypeList = data;
                  this.EquipmentList = data;
                  this.EquipmentTypeKey = this.WOEditList.EquipmentTypeKey;
                  this.EquipmentKey = this.WOEditList.EquipmentKey;
                });
            });

        }
        if (this.WOEditList.IsPhotoRequired == 1) {
          this.isPhotoRequired = true;
        }
        else {
          this.isPhotoRequired = false;
        }
        if (this.WOEditList.IsBarcodeRequired == 1) {
          this.isBarcodeRequired = true;
        }
        else {
          this.isBarcodeRequired = false;
        }
        if (this.WOEditList.IsReccurring == 1) {
          this.isRecurring = true;
          if (this.WOEditList.IntervalType == 'd') {

            this.dailyrecurring = true;
            this.DailyrecurringGap = this.WOEditList.OccurrenceInterval;
            this.WorkorderStartDate = new Date(this.WOEditList.WorkorderDate);
            this.WorkorderEndDate = new Date(this.WOEditList.WorkorderEndDate);
            var count = [];
            var WorkorderTime = [];
            var ocurraOntime = this.WOEditList.WorkorderTimes;
            var y = this.WOEditList.WorkorderTimes;
            count = y.split(',');
            this.dailyFrequency = count.length;
            if (count.length > 0) {

              this.timetable = { times: [] };
              this.timetable.times = [];
               var arr = [];
              for (var i = 0; i < count.length; i++) {
                this.timetable.times.push('');
                var test = count[i].split(":");
                // // console.log(test[0]+" .... "+test[1]);
                var cur_time = new Date(Date.now());
                var today = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test[0], test[1], 0);
               
                arr.push(today);
                this.timetable.times[i] = arr[i];
              }

            }

          }
          if (this.WOEditList.IntervalType == 'w') {

            this.weeklyrecurring = true;
          }
        }
        // this.dateValue=new Date(this.WOEditList.WorkorderDate);
        // var date_time=this.dateValue;
        //this.timeValue=new Date(this.WOEditList.WorkorderTime);

        this.workordertypekey = this.WOEditList.WorkorderTypeKey;
        this.FacilityKey = this.WOEditList.FacilityKey;

        this.ZoneKey = this.WOEditList.ZoneKey;

        this.RoomKey = this.WOEditList.RoomKey;
        this.PriorityKey = this.WOEditList.PriorityKey;
        this.WorkorderNotes = this.WOEditList.WorkorderNotes;
        this.EmployeeKey = this.WOEditList.EmployeeKey;

        // var cur_time = new Date(Date.now());

        // // var timeValue1=this.WOEditList.WorkorderTime;
        // // var time1=timeValue1.split(",");
        // // for(var i=0;i<time1.length;i++)
        // // {
        // // var test=time1[i].split(":");
        // // console.log(test[0]+" .... "+test[1]);
        // //  var today=new Date(cur_time.getFullYear(),cur_time.getMonth(),cur_time.getDate(),test[0],test[1],0);

        // //   this.timetable.times = [];
        // //   this.timetable.times.push(today);

        // // }
        // var timeValue1=this.WOEditList.WorkorderTime;
        // var test=timeValue1.split(":");
        //  var today=new Date(cur_time.getFullYear(),cur_time.getMonth(),cur_time.getDate(),test[0],test[1],0);
        //   this.timeValue=today;
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
      .getallEquipment(facility_key, floor_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentTypeList = data;
        this.EquipmentList = data;
      });
  }
  DeleteWO() {
    this.deleteWO = {
      workorderkey: this.WO_Key,
      OrganizationID: this.org_id
    };
    this.WorkOrderServiceService
      .deleteCurrent_WO(this.deleteWO)
      .subscribe((data: any[]) => {
      });
  }
  dailyrecurringChange() {
    this.weeklyrecurring = false;
    this.monthlyrecurring = false;
    this.dailyrecurring = true;
  }
  weeklyrecurringChange() {
    this.weeklyrecurring = true;
    this.monthlyrecurring = false;
    this.dailyrecurring = false;
  }
  monthlyrecurringChange() {
    this.weeklyrecurring = false;
    this.monthlyrecurring = true;
    this.dailyrecurring = false;
  }
  monthlyreccradio1_change() {
    this.monthlyreccradio1 = true;
    this.monthlyreccradio2 = false;
  }
  monthlyreccradio2_change() {
    this.monthlyreccradio1 = false;
    this.monthlyreccradio2 = true;
  }

}
