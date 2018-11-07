import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-workorder',
  templateUrl: './create-workorder.component.html',
  styleUrls: ['./create-workorder.component.scss']
})
export class CreateWorkorderComponent implements OnInit {
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
  emp_key: number;
  org_id: number;
  marked = false;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  EquipmentTypeKey;
  EquipmentKey;
  PriorityKey;
  EmployeeKey;
  timeValue: any;
  dateValue: any;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  WorkorderTypeKey;
  workorderNotes;
  showEqTypes = false;

  // temp-variables
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  priority;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyreccuringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;
  addWOT;
  intervaltype;
  repeatinterval;
  occursonday;
  weeklyrecurring;
  monthlyrecurring
  dailyrecurring;

  workorderCreation;
  isRecurring = false;
  monthlyreccradio1;
  monthlyreccradio2;
  newType = false;
  //
  //recurr variables
  monthlyDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  recurringFrequency = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekPosition = [{ id: 'First', value: '1' }, { id: 'Second', value: '2' }, { id: 'Third', value: '3' }, { id: 'Fourth', value: '4' }, { id: 'Fifth', value: '5' }, { id: 'Last', value: '-1' }];
  timetable = { times: [] };
  dailyFrequency;
  WorkorderStartDate;
  WorkorderEndDate;
  occurenceat;
  DailyrecurringGap;
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
  newworkordertypetext;
  role: String;
  name: String;
  employeeKey: Number;
  IsSupervisor: Number;

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

  constructor(private router: Router, private WorkOrderServiceService: WorkOrderServiceService) { }

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

  ngOnInit() {
    
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeeKey = profile.employeekey;
    this.org_id = profile.OrganizationID;
    this.dateValue=new Date(Date.now());
    this.weeklyrecurring = false;
    this.monthlyrecurring = false;
    this.dailyrecurring = false;
    this.monthlyreccradio1 = false;
    this.monthlyreccradio2 = false;
    this.WorkorderTypeKey="";
    this.FacilityKey="";
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
    this.PriorityKey="";
    this.EmployeeKey="";
    this.EquipmentTypeKey="";
    this.EquipmentKey="";
    this.DailyrecurringGap="";
    this.dailyFrequency="";
    this.day1="";
    this.day2="";
    this.month1="";
    this.month2="";
    this.pos2="";
    this.WorkorderStartDate=new Date(Date.now());
    this.WorkOrderServiceService
      .getallFacility(this.employeeKey, this.org_id)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService
      .getallworkorderType(this.employeeKey, this.org_id)
      .subscribe((data: any[]) => {
        var newArray = data.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
        newArray.unshift({ WorkorderTypeText: "Create New", WorkorderTypeKey: "-99" });
        this.workorderTypeList = newArray;
      });
    this.WorkOrderServiceService
      .getallPriority(this.org_id)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });
    this.WorkOrderServiceService
      .getallEmployee(this.employeeKey, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  toggleVisibility_Equipment(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility_Barcode(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility_Recur(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility_Photo(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
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
  getEquiment(floor_key, facility_key) {
    this.WorkOrderServiceService
      .getallEquipment(facility_key, floor_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentTypeList = data;
        this.EquipmentList = data;
      });
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
  showEquipment_typechange(equip_type, facility, floor) {
    this.WorkOrderServiceService
      .getEquipment_typechange(equip_type, facility, floor, this.org_id)
      .subscribe((data: any[]) => {
        this.EquipmentList = data;
      });
  }
  createWorkOrder() {
   
    if (this.showEqTypes === false) {
      this.createWorkorder1();
      console.log('Equipment***Not');

    } else {
      this.createWorkorder2();

    }
  }
  createWorkorder1() {
  
    if (!this.WorkorderTypeKey) {
      alert("select work-order type!");
    }else if(this.newType == true && !(this.newworkordertypetext))
    {
      alert("enter work-order type!");
    }else if(this.newType == true && !(this.newworkordertypetext.trim()))
    {
      alert("enter work-order type!");
    }
    else if (!this.FacilityKey) {
      alert("select building!");
    }
    else if (!this.FloorKey) {
      alert("select floor!");
    }
    else if ( (!(this.timeValue)) && (this.isRecurring==false) ) {
      alert("please provide time!");
    }
    else if (this.isRecurring == true) 
    {
      if(this.dailyrecurring==false && this.weeklyrecurring==false && this.monthlyrecurring==false)
      {
        alert("Recurring Period is not provided !");
      }
      if (this.dailyrecurring == true) {
        if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else if (!(this.dailyFrequency)) {
          alert("select frequency !");
        }else if(this.dailyFrequency)
        {
        for(var i=0;i<this.dailyFrequency;i++)
        {
          if(!(this.timetable.times[i]))
          {
            alert("Enter time values !");
          }
        }
        this.withoutequip_wo();
      }
      

      }
      else if (this.weeklyrecurring == true) 
      {
        if (!(this.weektable_one) && !(this.weektable_two) && !(this.weektable_three) && !(this.weektable_four) && !(this.weektable_five) && !(this.weektable_six) && !(this.weektable_seven)) {
          alert("please select atleast one day!");
        }
        else if (!this.Time_weekly) {
          alert("please provide time!");
        }
       else if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else
        {
        this.withoutequip_wo();
        }
      }
      else if (this.monthlyrecurring == true) 
      {
        if (this.monthlyreccradio1 == false && this.monthlyreccradio2 == false) {
          alert("Select a radio option from monthly reccuring !");
        }
        else if(this.monthlyreccradio1 == true)
        {
          if(!(this.day1) || !(this.month1))
          {
            alert("provide entries for monthly recurring !");
          }
         
        }
        else if(this.monthlyreccradio2 == true)
        {
          if(!(this.day2) || !(this.pos2) || !(this.month2))
          {
            alert("provide entries for monthly recurring !");
          }
          
        }
        else if (!this.Time_monthly) {
          alert("please provide time!");
        }
       else if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else{
        this.withoutequip_wo();
        }
      }
      
    }
    else
    {
      var roomlistObj = [];
      var roomtypelistObj = [];
      var zonelistObj = [];
      var floorlistObj = [];
      var facilitylistObj = [];
      var facilityList = [];
      var roomList = [];
      var roomtypeList = [];
      var zoneList = [];
      var floorList = [];
      facilitylistObj = this.facilitylist;
      floorlistObj = this.FloorList;
      zonelistObj = this.zonelist;
      roomtypelistObj = this.RoomTypeList;
      roomlistObj = this.RoomList;
      this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
      this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
      this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
      this.occursonday = null;
      if (this.WorkorderTypeKey) {
        this.wot = this.WorkorderTypeKey;
      } else {
        this.wot = null;
      }
      if (this.workorderNotes) {
        this.notes = this.workorderNotes;
      } else {
        this.notes = null;
      }
      if (this.FacilityKey) {

      }
      if (this.FloorKey) {
      }
      var roomsString;
      if (this.RoomKey) {
        roomsString = this.RoomKey;
      } else {
        if (roomlistObj) {
          for (var j = 0; j < roomlistObj.length; j++) {
            roomList.push(roomlistObj[j].RoomKey);
          }
          roomsString = roomList.join(',');
        } else {
          return;
        }
      }
      var facilityString;
      if (this.FacilityKey) {
        facilityString = this.FacilityKey;
      } else {
        if (facilitylistObj) {
          for (var j = 0; j < facilitylistObj.length; j++) {
            facilityList.push(facilitylistObj[j].FacilityKey);
          }
          facilityString = facilityList.join(',');
        }
      }
      var floorString;
      if (this.FloorKey) {
        floorString = this.FloorKey;
      } else {
        if (floorlistObj) {
          for (var j = 0; j < floorlistObj.length; j++) {
            floorList.push(floorlistObj[j].FloorKey);
          }
          floorString = floorList.join(',');
        }
      }
      var zoneString;
      if (this.ZoneKey) {
        zoneString = this.ZoneKey;
      } else {
        this.zone = null;
        if (zonelistObj) {
          for (var j = 0; j < zonelistObj.length; j++) {
            zoneList.push(zonelistObj[j].ZoneKey);
          }
          zoneString = zoneList.join(',');
        }
      }
      var roomtypeString;
      if (this.RoomTypeKey) {
        roomtypeString = this.RoomTypeKey;
      } else {
        if (roomtypelistObj) {
          for (var j = 0; j < roomtypelistObj.length; j++) {
            roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
          }
          roomtypeString = roomtypeList.join(',');
        }
      }
      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {
        this.eqp_key = - 1;
      }
      if (this.EmployeeKey) {
        this.emp_key = this.EmployeeKey;
      } else {
        this.emp_key = - 1;
      }
      if (this.ZoneKey) {
        this.zone = this.ZoneKey;
      } else {
        this.zone = null;

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
      if (this.isBarcodeRequired) {
        this.is_BarcodeRequired = 1;
      } else {
        this.is_BarcodeRequired = 0;
      }
      if (this.isRecurring == false) {
        this.isrecurring = 0;
      }
      else if (this.isRecurring == true && this.dailyrecurring == true) {
        this.intervaltype = 'd';
        this.isrecurring = 1;
      } else if (this.isRecurring == true && this.weeklyrecurring == true) {
        this.intervaltype = 'w';
        this.isrecurring = 1;
        var selectedWeekdays = [];
        if (this.weektable_one === true)
          selectedWeekdays.push('su');
        if (this.weektable_two === true)
          selectedWeekdays.push('mo');
        if (this.weektable_three === true)
          selectedWeekdays.push('tu');
        if (this.weektable_four === true)
          selectedWeekdays.push('we');
        if (this.weektable_five === true)
          selectedWeekdays.push('th');
        if (this.weektable_six === true)
          selectedWeekdays.push('fr');
        if (this.weektable_seven === true)
          selectedWeekdays.push('sa');
        this.occurs_on = selectedWeekdays.join(',');
      } else if (this.isRecurring == true && this.monthlyrecurring == true) {
        this.intervaltype = 'm';
        this.isrecurring = 1;
      }
      if (this.isRecurring == false) {
        if (this.dateValue) {
          this.startDT = this.convert_DT(this.dateValue);
        } else {
          this.startDT = this.convert_DT(new Date());
        }
        this.endDT = this.startDT;
      }
      else {
        if (this.WorkorderStartDate) {
          this.startDT = this.convert_DT(this.WorkorderStartDate);
        } else {
          this.startDT = this.convert_DT(new Date());
        }
        if (this.WorkorderEndDate) {
          this.endDT = this.convert_DT(this.WorkorderEndDate);
        } else {
          this.endDT = this.convert_DT(new Date());
        }
      }
      
      if (this.isRecurring == false) {
        console.log(this.timeValue);
        if (this.timeValue) {
          this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
        } else {
          this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
        }
      } else if (this.isRecurring == true && this.dailyrecurring == true) {
        var timeset = [];
        var timeset_corr = [];
        timeset = this.timetable.times;
        for (var i = 0; i < timeset.length; i++) {
          timeset_corr.push(timeset[i].getHours() + ':' + timeset[i].getMinutes());
        }

        this.workTime = timeset_corr.join(',');
        if(!(this.DailyrecurringGap))
        {
          this.DailyrecurringGap=0;
          this.rep_interval = this.DailyrecurringGap;
        }
        else
        {
        this.rep_interval = this.DailyrecurringGap;
        }
      }
      else if (this.isRecurring == true && this.weeklyrecurring == true) {
        if (this.Time_weekly) {
          this.workTime = this.Time_weekly.getHours() + ':' + this.Time_weekly.getMinutes();
        }
        else {
          alert("Please Enter Time!");
        }
      } else if (this.isRecurring == true && this.monthlyrecurring == true) {
        if (this.Time_monthly) {
          this.workTime = this.Time_monthly.getHours() + ':' + this.Time_monthly.getMinutes();
        }
        else {
          alert("Please Enter Time!");
        }
        if (this.monthlyreccradio1 == true) {
          this.occurs_on = this.day1;
          this.rep_interval = (this.month1) ? this.month1 : 1;
        }
        else if (this.monthlyreccradio2 == true) {

          this.occurs_on = this.day2;
          this.rep_interval = (this.month2) ? this.month2 : 1;
          this.occurs_type = this.pos2;
          switch (this.occurs_on) {
            case '0':
              this.occurs_on = 'su';
              break;
            case '1':
              this.occurs_on = "mo";
              break;
            case '2':
              this.occurs_on = "tu";
              break;
            case '3':
              this.occurs_on = "we";
              break;
            case '4':
              this.occurs_on = "th";
              break;
            case '5':
              this.occurs_on = "fr";
              break;
            case '6':
              this.occurs_on = "sa";
              break;
          }
        }
      }
      if (this.newType == true) {
        if (this.newworkordertypetext) {
          this.WorkOrderServiceService
            .checkforcheckForWorkOrderType(this.newworkordertypetext, this.employeeKey, this.org_id)
            .subscribe((data: any[]) => {
              if (data[0].count == 0) {
                this.addWOT = {
                  WorkorderType: this.newworkordertypetext,
                  employeekey: this.employeeKey,
                  OrganizationID: this.org_id,
                };
                this.WorkOrderServiceService
                  .AddnewWOT(this.addWOT)
                  .subscribe((data: any[]) => {
                    this.wot = data[0].WorkOrderTypeKey;
                  });
              }
            });
        }

      }
      this.workorderCreation = {
        occursontime: this.workTime,
        workorderkey: - 99,
        workordertypekey: this.wot,
        workordernote: this.notes,
        equipmentkey: this.eqp_key,
        roomkeys: roomsString,
        facilitykeys: facilityString,
        floorkeys: floorString,
        zonekeys: zoneString,
        roomtypekeys: roomtypeString,
        employeekey: this.emp_key,
        priority: this.priority,
        fromdate: this.startDT,
        todate: this.endDT,
        isbar: this.is_BarcodeRequired,
        isphoto: this.is_PhotoRequired,
        metaupdatedby: this.employeeKey,
        OrganizationID: this.org_id,
        intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
        repeatinterval: this.rep_interval,
        occursonday: this.occurs_on,
        occurstype: this.occurs_type
      };
      this.WorkOrderServiceService.addWorkOrderWithOutEqup(this.workorderCreation).subscribe(res => {
        alert("work-order created successfully");
        this.router.navigateByUrl('/ViewWorkOrder');
      });
    }
  }
  createWorkorder2() {
    if (!this.WorkorderTypeKey) {
      alert("select work-order type!");
    }else if(this.newType == true && !(this.newworkordertypetext))
    {
      alert("enter work-order type!");
    }else if(this.newType == true && !(this.newworkordertypetext.trim()))
    {
      alert("enter work-order type!");
    }
    else if (!this.FacilityKey) {
      alert("select building!");
    }
    else if (!this.FloorKey) {
      alert("select floor!");
    }
    else if ( (!(this.timeValue)) && (this.isRecurring==false) ) {
      alert("please provide time!");
    }else if(this.showEqTypes==true && !(this.EquipmentTypeKey))
    {
      alert("select equipment type!");
    }
    else if (this.isRecurring == true) 
    {
      if(this.dailyrecurring==false && this.weeklyrecurring==false && this.monthlyrecurring==false)
      {
        alert("Recurring Period is not provided !");
      }
      if (this.dailyrecurring == true) {
        if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else if (!(this.dailyFrequency)) {
          alert("select frequency !");
        }else if(this.dailyFrequency)
        {
        for(var i=0;i<this.dailyFrequency;i++)
        {
          if(!(this.timetable.times[i]))
          {
            alert("Enter time values !");
          }
        }
        this.withequip_wo();
      }
      

      }
      else if (this.weeklyrecurring == true) 
      {
        if (!(this.weektable_one) && !(this.weektable_two) && !(this.weektable_three) && !(this.weektable_four) && !(this.weektable_five) && !(this.weektable_six) && !(this.weektable_seven)) {
          alert("please select atleast one day!");
        }
        else if (!this.Time_weekly) {
          alert("please provide time!");
        }
       else if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else
        {
        this.withequip_wo();
        }
      }
      else if (this.monthlyrecurring == true) 
      {
        if (this.monthlyreccradio1 == false && this.monthlyreccradio2 == false) {
          alert("Select a radio option from monthly reccuring !");
        }
        else if(this.monthlyreccradio1 == true)
        {
          if(!(this.day1) || !(this.month1))
          {
            alert("provide entries for monthly recurring !");
          }
         
        }
        else if(this.monthlyreccradio2 == true)
        {
          if(!(this.day2) || !(this.pos2) || !(this.month2))
          {
            alert("provide entries for monthly recurring !");
          }
          
        }
        else if (!this.Time_monthly) {
          alert("please provide time!");
        }
       else if (!this.WorkorderEndDate) {
          alert("please provide end date!");
        }
        else{
        this.withequip_wo();
        }
      }
      
    }
    else
    {

     
      var roomlistObj = [];
      var roomtypelistObj = [];
      var zonelistObj = [];
      var floorlistObj = [];
      var facilitylistObj = [];
      var EquListObj = [];
      var facilityList = [];
      var roomList = [];
      var roomtypeList = [];
      var zoneList = [];
      var floorList = [];
      var equList = [];
      facilitylistObj = this.facilitylist;
      floorlistObj = this.FloorList;
      zonelistObj = this.zonelist;
      roomtypelistObj = this.RoomTypeList;
      roomlistObj = this.RoomList;
      EquListObj = this.EquipmentList;

      this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
      this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
      this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
      this.occursonday = null;

      if (this.WorkorderTypeKey) {
        this.wot = this.WorkorderTypeKey;
      } else {
        this.wot = null;

      }
      if (this.workorderNotes) {
        this.notes = this.workorderNotes;
      } else {
        this.notes = null;
      }
      if (this.FacilityKey) {

      }
      if (this.FloorKey) {

      }
      var roomsString;
      roomsString = -1;
      var facilityString;
      if (this.FacilityKey) {
        facilityString = this.FacilityKey;
      } else {
        if (facilitylistObj) {
          for (var j = 0; j < facilitylistObj.length; j++) {
            facilityList.push(facilitylistObj[j].FacilityKey);
          }
          facilityString = facilityList.join(',');
        }
      }
      var floorString;
      if (this.FloorKey) {
        floorString = this.FloorKey;
      } else {
        if (floorlistObj) {
          for (var j = 0; j < floorlistObj.length; j++) {
            floorList.push(floorlistObj[j].FloorKey);
          }
          floorString = floorList.join(',');
        }
      }
      var zoneString;
      if (this.ZoneKey) {
        zoneString = this.ZoneKey;
      } else {
        this.zone = null;
        if (zonelistObj) {
          for (var j = 0; j < zonelistObj.length; j++) {
            zoneList.push(zonelistObj[j].ZoneKey);
          }
          zoneString = zoneList.join(',');
        }
      }
      var roomtypeString;
      if (this.RoomTypeKey) {
        roomtypeString = this.RoomTypeKey;
      } else {
        if (roomtypelistObj) {
          for (var j = 0; j < roomtypelistObj.length; j++) {
            roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
          }
          roomtypeString = roomtypeList.join(',');
        }
      }
      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {
        this.eqp_key = - 1;
      }
      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {
        if (EquListObj) {
          for (var j = 0; j < EquListObj.length; j++) {
            equList.push(EquListObj[j].EquipmentKey);
          }
          this.eqp_key = equList.join(',');
        }
      }
      if (this.EmployeeKey) {
        this.emp_key = this.EmployeeKey;
      } else {
        this.emp_key = - 1;
      }
      if (this.ZoneKey) {
        this.zone = this.ZoneKey;
      } else {
        this.zone = null;

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
      if (this.isBarcodeRequired) {
        this.is_BarcodeRequired = 1;
      } else {
        this.is_BarcodeRequired = 0;
      }
      if (this.isRecurring == false) {
        this.isrecurring = 0;
      }
      else if (this.isRecurring == true && this.dailyrecurring == true) {
        this.intervaltype = 'd';
        this.isrecurring = 1;
      } else if (this.isRecurring == true && this.weeklyrecurring == true) {
        this.intervaltype = 'w';
        this.isrecurring = 1;
        var selectedWeekdays = [];
        if (this.weektable_one === true)
          selectedWeekdays.push('su');
        if (this.weektable_two === true)
          selectedWeekdays.push('mo');
        if (this.weektable_three === true)
          selectedWeekdays.push('tu');
        if (this.weektable_four === true)
          selectedWeekdays.push('we');
        if (this.weektable_five === true)
          selectedWeekdays.push('th');
        if (this.weektable_six === true)
          selectedWeekdays.push('fr');
        if (this.weektable_seven === true)
          selectedWeekdays.push('sa');
        this.occurs_on = selectedWeekdays.join(',');
      }
      if (this.isRecurring == false) {
        if (this.dateValue) {
          this.startDT = this.convert_DT(this.dateValue);
        } else {
          this.startDT = this.convert_DT(new Date());
        }
        this.endDT = this.startDT;
      }
      else {
        if (this.WorkorderStartDate) {
          this.startDT = this.convert_DT(this.WorkorderStartDate);
        } else {
          this.startDT = this.convert_DT(new Date());
        }
        if (this.WorkorderEndDate) {
          this.endDT = this.convert_DT(this.WorkorderEndDate);
        } else {
          this.endDT = this.convert_DT(new Date());
        }
      }
      if (this.isRecurring == false) {
        if (this.timeValue) {
          this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
        } else {
          this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
        }
      } else if (this.isRecurring == true && this.dailyrecurring == true) {
        var timeset = [];
        var timeset_corr = [];
        timeset = this.timetable.times;
        for (var i = 0; i < timeset.length; i++) {
          timeset_corr.push(timeset[i].getHours() + ':' + timeset[i].getMinutes());
        }

        this.workTime = timeset_corr.join(',');
        if(!(this.DailyrecurringGap))
        {
          this.DailyrecurringGap=0;
          this.rep_interval = this.DailyrecurringGap;
        }
        else
        {
        this.rep_interval = this.DailyrecurringGap;
        }
      } else if (this.isRecurring == true && this.weeklyrecurring == true) {
        this.workTime = this.Time_weekly.getHours() + ':' + this.Time_weekly.getMinutes();
      } else if (this.isRecurring == true && this.monthlyrecurring == true) {
        this.workTime = this.Time_monthly.getHours() + ':' + this.Time_monthly.getMinutes();
        if (this.monthlyreccradio1 == true) {
          this.occurs_on = this.day1;
          this.rep_interval = (this.month1) ? this.month1 : 1;
        }
        else if (this.monthlyreccradio2 == true) {
          this.occurs_on = this.day2;
          this.rep_interval = (this.month2) ? this.month2 : 1;
          this.occurs_type = this.pos2;
          switch (this.occurs_on) {
            case '0':
              this.occurs_on = 'su';
              break;
            case '1':
              this.occurs_on = "mo";
              break;
            case '2':
              this.occurs_on = "tu";
              break;
            case '3':
              this.occurs_on = "we";
              break;
            case '4':
              this.occurs_on = "th";
              break;
            case '5':
              this.occurs_on = "fr";
              break;
            case '6':
              this.occurs_on = "sa";
              break;
          }
        }
      }
      if (this.newType == true) {
        if (this.newworkordertypetext) {
          this.WorkOrderServiceService
            .checkforcheckForWorkOrderType(this.newworkordertypetext, this.employeeKey, this.org_id)
            .subscribe((data: any[]) => {
              if (data[0].count == 0) {
                this.addWOT = {
                  WorkorderType: this.newworkordertypetext,
                  employeekey: this.employeeKey,
                  OrganizationID: this.org_id
                };
                this.WorkOrderServiceService
                  .AddnewWOT(this.addWOT)
                  .subscribe((data: any[]) => {
                    this.wot = data[0].WorkOrderTypeKey;
                  });
              }
            });
        }

      }
      this.workorderCreation = {
        occursontime: this.workTime,
        workorderkey: - 99,
        workordertypekey: this.wot,
        workordernote: this.notes,
        equipmentkey: this.eqp_key,
        roomkeys: roomsString,
        facilitykeys: facilityString,
        floorkeys: floorString,
        zonekeys: zoneString,
        roomtypekeys: roomtypeString,
        employeekey: this.emp_key,
        priority: this.priority,
        fromdate: this.startDT,
        todate: this.endDT,
        isbar: this.is_BarcodeRequired,
        isphoto: this.is_PhotoRequired,
        metaupdatedby: this.employeeKey,
        OrganizationID: this.org_id,
        intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
        repeatinterval: this.rep_interval,
        occursonday: this.occurs_on,
        occurstype: this.occurs_type
      };
      this.WorkOrderServiceService.addWorkOrderEqup(this.workorderCreation).subscribe(res => {
        alert("work-order created successfully");
        this.router.navigateByUrl('/ViewWorkOrder');
      });
    }
  }
  withequip_wo()
  {
    
    var roomlistObj = [];
    var roomtypelistObj = [];
    var zonelistObj = [];
    var floorlistObj = [];
    var facilitylistObj = [];
    var EquListObj = [];
    var facilityList = [];
    var roomList = [];
    var roomtypeList = [];
    var zoneList = [];
    var floorList = [];
    var equList = [];
    facilitylistObj = this.facilitylist;
    floorlistObj = this.FloorList;
    zonelistObj = this.zonelist;
    roomtypelistObj = this.RoomTypeList;
    roomlistObj = this.RoomList;
    EquListObj = this.EquipmentList;

    this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
    this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
    this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
    this.occursonday = null;

    if (this.WorkorderTypeKey) {
      this.wot = this.WorkorderTypeKey;
    } else {
      this.wot = null;

    }
    if (this.workorderNotes) {
      this.notes = this.workorderNotes;
    } else {
      this.notes = null;
    }
    if (this.FacilityKey) {

    }
    if (this.FloorKey) {

    }
    var roomsString;
    roomsString = -1;
    var facilityString;
    if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else {
      if (facilitylistObj) {
        for (var j = 0; j < facilitylistObj.length; j++) {
          facilityList.push(facilitylistObj[j].FacilityKey);
        }
        facilityString = facilityList.join(',');
      }
    }
    var floorString;
    if (this.FloorKey) {
      floorString = this.FloorKey;
    } else {
      if (floorlistObj) {
        for (var j = 0; j < floorlistObj.length; j++) {
          floorList.push(floorlistObj[j].FloorKey);
        }
        floorString = floorList.join(',');
      }
    }
    var zoneString;
    if (this.ZoneKey) {
      zoneString = this.ZoneKey;
    } else {
      this.zone = null;
      if (zonelistObj) {
        for (var j = 0; j < zonelistObj.length; j++) {
          zoneList.push(zonelistObj[j].ZoneKey);
        }
        zoneString = zoneList.join(',');
      }
    }
    var roomtypeString;
    if (this.RoomTypeKey) {
      roomtypeString = this.RoomTypeKey;
    } else {
      if (roomtypelistObj) {
        for (var j = 0; j < roomtypelistObj.length; j++) {
          roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
        }
        roomtypeString = roomtypeList.join(',');
      }
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {
      this.eqp_key = - 1;
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {
      if (EquListObj) {
        for (var j = 0; j < EquListObj.length; j++) {
          equList.push(EquListObj[j].EquipmentKey);
        }
        this.eqp_key = equList.join(',');
      }
    }
    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
    }
    if (this.ZoneKey) {
      this.zone = this.ZoneKey;
    } else {
      this.zone = null;

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
    if (this.isBarcodeRequired) {
      this.is_BarcodeRequired = 1;
    } else {
      this.is_BarcodeRequired = 0;
    }
    if (this.isRecurring == false) {
      this.isrecurring = 0;
    }
    else if (this.isRecurring == true && this.dailyrecurring == true) {
      this.intervaltype = 'd';
      this.isrecurring = 1;
    } else if (this.isRecurring == true && this.weeklyrecurring == true) {
      this.intervaltype = 'w';
      this.isrecurring = 1;
      var selectedWeekdays = [];
      if (this.weektable_one === true)
        selectedWeekdays.push('su');
      if (this.weektable_two === true)
        selectedWeekdays.push('mo');
      if (this.weektable_three === true)
        selectedWeekdays.push('tu');
      if (this.weektable_four === true)
        selectedWeekdays.push('we');
      if (this.weektable_five === true)
        selectedWeekdays.push('th');
      if (this.weektable_six === true)
        selectedWeekdays.push('fr');
      if (this.weektable_seven === true)
        selectedWeekdays.push('sa');
      this.occurs_on = selectedWeekdays.join(',');
    }
    if (this.isRecurring == false) {
      if (this.dateValue) {
        this.startDT = this.convert_DT(this.dateValue);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      this.endDT = this.startDT;
    }
    else {
      if (this.WorkorderStartDate) {
        this.startDT = this.convert_DT(this.WorkorderStartDate);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      if (this.WorkorderEndDate) {
        this.endDT = this.convert_DT(this.WorkorderEndDate);
      } else {
        this.endDT = this.convert_DT(new Date());
      }
    }
    if (this.isRecurring == false) {
      if (this.timeValue) {
        this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
      } else {
        this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
      }
    } else if (this.isRecurring == true && this.dailyrecurring == true) {
      var timeset = [];
      var timeset_corr = [];
      timeset = this.timetable.times;
      for (var i = 0; i < timeset.length; i++) {
        timeset_corr.push(timeset[i].getHours() + ':' + timeset[i].getMinutes());
      }

      this.workTime = timeset_corr.join(',');
      this.rep_interval = this.DailyrecurringGap;
    } else if (this.isRecurring == true && this.weeklyrecurring == true) {
      this.workTime = this.Time_weekly.getHours() + ':' + this.Time_weekly.getMinutes();
    } else if (this.isRecurring == true && this.monthlyrecurring == true) {
      this.workTime = this.Time_monthly.getHours() + ':' + this.Time_monthly.getMinutes();
      if (this.monthlyreccradio1 == true) {
        this.occurs_on = this.day1;
        this.rep_interval = (this.month1) ? this.month1 : 1;
      }
      else if (this.monthlyreccradio2 == true) {
        this.occurs_on = this.day2;
        this.rep_interval = (this.month2) ? this.month2 : 1;
        this.occurs_type = this.pos2;
        switch (this.occurs_on) {
          case '0':
            this.occurs_on = 'su';
            break;
          case '1':
            this.occurs_on = "mo";
            break;
          case '2':
            this.occurs_on = "tu";
            break;
          case '3':
            this.occurs_on = "we";
            break;
          case '4':
            this.occurs_on = "th";
            break;
          case '5':
            this.occurs_on = "fr";
            break;
          case '6':
            this.occurs_on = "sa";
            break;
        }
      }
    }
    if (this.newType == true) {
      if (this.newworkordertypetext) {
        this.WorkOrderServiceService
          .checkforcheckForWorkOrderType(this.newworkordertypetext, this.employeeKey, this.org_id)
          .subscribe((data: any[]) => {
            if (data[0].count == 0) {
              this.addWOT = {
                WorkorderType: this.newworkordertypetext,
                employeekey: this.employeeKey,
                OrganizationID: this.org_id
              };
              this.WorkOrderServiceService
                .AddnewWOT(this.addWOT)
                .subscribe((data: any[]) => {
                  this.wot = data[0].WorkOrderTypeKey;
                });
            }
          });
      }

    }
    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: this.eqp_key,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.employeeKey,
      OrganizationID: this.org_id,
      intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
      repeatinterval: this.rep_interval,
      occursonday: this.occurs_on,
      occurstype: this.occurs_type
    };
    this.WorkOrderServiceService.addWorkOrderEqup(this.workorderCreation).subscribe(res => {
      alert("work-order created successfully");
      this.router.navigateByUrl('/ViewWorkOrder');
    });
  
  }
  addFormField() {
   
    this.timetable.times = [];
    for (var i = 0; i < this.dailyFrequency; i++) {
      this.timetable.times.push('');
    }
  }
  change_values() {
    if (this.showEqTypes == true) {
      this.ZoneKey = -1;
      this.RoomTypeKey = -1;
      this.RoomKey = -1;
    }
  }
  checkfornewWOT(wot_key) {

    if (wot_key == '-99') {

      this.newType = true;
    }
  }
  GobacktoMenu() {
    this.newType = false;
  }
  withoutequip_wo()
  {    var roomlistObj = [];
    var roomtypelistObj = [];
    var zonelistObj = [];
    var floorlistObj = [];
    var facilitylistObj = [];
    var facilityList = [];
    var roomList = [];
    var roomtypeList = [];
    var zoneList = [];
    var floorList = [];
    facilitylistObj = this.facilitylist;
    floorlistObj = this.FloorList;
    zonelistObj = this.zonelist;
    roomtypelistObj = this.RoomTypeList;
    roomlistObj = this.RoomList;
    this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
    this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
    this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
    this.occursonday = null;
    if (this.WorkorderTypeKey) {
      this.wot = this.WorkorderTypeKey;
    } else {
      this.wot = null;
    }
    if (this.workorderNotes) {
      this.notes = this.workorderNotes;
    } else {
      this.notes = null;
    }
    if (this.FacilityKey) {

    }
    if (this.FloorKey) {
    }
    var roomsString;
    if (this.RoomKey) {
      roomsString = this.RoomKey;
    } else {
      if (roomlistObj) {
        for (var j = 0; j < roomlistObj.length; j++) {
          roomList.push(roomlistObj[j].RoomKey);
        }
        roomsString = roomList.join(',');
      } else {
        return;
      }
    }
    var facilityString;
    if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else {
      if (facilitylistObj) {
        for (var j = 0; j < facilitylistObj.length; j++) {
          facilityList.push(facilitylistObj[j].FacilityKey);
        }
        facilityString = facilityList.join(',');
      }
    }
    var floorString;
    if (this.FloorKey) {
      floorString = this.FloorKey;
    } else {
      if (floorlistObj) {
        for (var j = 0; j < floorlistObj.length; j++) {
          floorList.push(floorlistObj[j].FloorKey);
        }
        floorString = floorList.join(',');
      }
    }
    var zoneString;
    if (this.ZoneKey) {
      zoneString = this.ZoneKey;
    } else {
      this.zone = null;
      if (zonelistObj) {
        for (var j = 0; j < zonelistObj.length; j++) {
          zoneList.push(zonelistObj[j].ZoneKey);
        }
        zoneString = zoneList.join(',');
      }
    }
    var roomtypeString;
    if (this.RoomTypeKey) {
      roomtypeString = this.RoomTypeKey;
    } else {
      if (roomtypelistObj) {
        for (var j = 0; j < roomtypelistObj.length; j++) {
          roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
        }
        roomtypeString = roomtypeList.join(',');
      }
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {
      this.eqp_key = - 1;
    }
    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
    }
    if (this.ZoneKey) {
      this.zone = this.ZoneKey;
    } else {
      this.zone = null;

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
    if (this.isBarcodeRequired) {
      this.is_BarcodeRequired = 1;
    } else {
      this.is_BarcodeRequired = 0;
    }
    if (this.isRecurring == false) {
      this.isrecurring = 0;
    }
    else if (this.isRecurring == true && this.dailyrecurring == true) {
      this.intervaltype = 'd';
      this.isrecurring = 1;
    } else if (this.isRecurring == true && this.weeklyrecurring == true) {
      this.intervaltype = 'w';
      this.isrecurring = 1;
      var selectedWeekdays = [];
      if (this.weektable_one === true)
        selectedWeekdays.push('su');
      if (this.weektable_two === true)
        selectedWeekdays.push('mo');
      if (this.weektable_three === true)
        selectedWeekdays.push('tu');
      if (this.weektable_four === true)
        selectedWeekdays.push('we');
      if (this.weektable_five === true)
        selectedWeekdays.push('th');
      if (this.weektable_six === true)
        selectedWeekdays.push('fr');
      if (this.weektable_seven === true)
        selectedWeekdays.push('sa');
      this.occurs_on = selectedWeekdays.join(',');
    } else if (this.isRecurring == true && this.monthlyrecurring == true) {
      this.intervaltype = 'm';
      this.isrecurring = 1;
    }
    if (this.isRecurring == false) {
      if (this.dateValue) {
        this.startDT = this.convert_DT(this.dateValue);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      this.endDT = this.startDT;
    }
    else {
      if (this.WorkorderStartDate) {
        this.startDT = this.convert_DT(this.WorkorderStartDate);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      if (this.WorkorderEndDate) {
        this.endDT = this.convert_DT(this.WorkorderEndDate);
      } else {
        this.endDT = this.convert_DT(new Date());
      }
    }
    
    if (this.isRecurring == false) {
      console.log(this.timeValue);
      if (this.timeValue) {
        this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
      } else {
        this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
      }
    } else if (this.isRecurring == true && this.dailyrecurring == true) {
      var timeset = [];
      var timeset_corr = [];
      timeset = this.timetable.times;
      for (var i = 0; i < timeset.length; i++) {
        timeset_corr.push(timeset[i].getHours() + ':' + timeset[i].getMinutes());
      }

      this.workTime = timeset_corr.join(',');
      this.rep_interval = this.DailyrecurringGap;
    }
    else if (this.isRecurring == true && this.weeklyrecurring == true) {
      if (this.Time_weekly) {
        this.workTime = this.Time_weekly.getHours() + ':' + this.Time_weekly.getMinutes();
      }
      else {
        alert("Please Enter Time!");
      }
    } else if (this.isRecurring == true && this.monthlyrecurring == true) {
      if (this.Time_monthly) {
        this.workTime = this.Time_monthly.getHours() + ':' + this.Time_monthly.getMinutes();
      }
      else {
        alert("Please Enter Time!");
      }
      if (this.monthlyreccradio1 == true) {
        this.occurs_on = this.day1;
        this.rep_interval = (this.month1) ? this.month1 : 1;
      }
      else if (this.monthlyreccradio2 == true) {

        this.occurs_on = this.day2;
        this.rep_interval = (this.month2) ? this.month2 : 1;
        this.occurs_type = this.pos2;
        switch (this.occurs_on) {
          case '0':
            this.occurs_on = 'su';
            break;
          case '1':
            this.occurs_on = "mo";
            break;
          case '2':
            this.occurs_on = "tu";
            break;
          case '3':
            this.occurs_on = "we";
            break;
          case '4':
            this.occurs_on = "th";
            break;
          case '5':
            this.occurs_on = "fr";
            break;
          case '6':
            this.occurs_on = "sa";
            break;
        }
      }
    }
    if (this.newType == true) {
      if (this.newworkordertypetext) {
        this.WorkOrderServiceService
          .checkforcheckForWorkOrderType(this.newworkordertypetext, this.employeeKey, this.org_id)
          .subscribe((data: any[]) => {
            if (data[0].count == 0) {
              this.addWOT = {
                WorkorderType: this.newworkordertypetext,
                employeekey: this.employeeKey,
                OrganizationID: this.org_id,
              };
              this.WorkOrderServiceService
                .AddnewWOT(this.addWOT)
                .subscribe((data: any[]) => {
                  this.wot = data[0].WorkOrderTypeKey;
                });
            }
          });
      }

    }
    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: this.eqp_key,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.employeeKey,
      OrganizationID: this.org_id,
      intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
      repeatinterval: this.rep_interval,
      occursonday: this.occurs_on,
      occurstype: this.occurs_type
    };
    this.WorkOrderServiceService.addWorkOrderWithOutEqup(this.workorderCreation).subscribe(res => {
      alert("work-order created successfully");
      this.router.navigateByUrl('/ViewWorkOrder');
    });
  }
}
