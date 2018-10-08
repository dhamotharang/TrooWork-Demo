import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';

@Component({
  selector: 'app-inspection-create',
  templateUrl: './inspection-create.component.html',
  styleUrls: ['./inspection-create.component.scss']
})
export class InspectionCreateComponent implements OnInit {
  marked = false;
  templateName: Inspection[];
  auditor: Inspection[];
  employee: Inspection[];
  building:Inspection[];
  floors:Inspection[];
  zone:Inspection[];
  room:Inspection[];
  roomtype:Inspection[];
  facikey: Number;
  TemplateID: Number;
  SupervisorKey: Number;
  fromdate:Date;
  todate:Date;
  theCheckbox:any;
  time1:any;
  RoomKey:Number;
// adding properties and methods that will be used by the igxDatePicker
public date: Date = new Date(Date.now());

private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});

public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
}
 convert_DT(str) {
  var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice( - 2),
          day = ("0" + date.getDate()).slice( - 2);
          return [date.getFullYear(), mnth, day].join("-");
  };

  constructor(private inspectionService: InspectionService) { }
  selectFloorfromBuildings(facKey){
    this.facikey=facKey;
    this.inspectionService
    .getallFloorNames(facKey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.floors = data;
    });
  }
  selectZoneRoomRoomtypefromFloor(flkey){
    this.inspectionService
    .getallZones(this.facikey,flkey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.zone = data;
    });
    this.inspectionService
    .getallRooms(this.facikey,flkey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.room = data;
    });
    this.inspectionService
    .getallRoomType(this.facikey,flkey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.roomtype = data;
    });
  }
  
  createInspection() {
    // debugger;
    console.log(this.fromdate);
    console.log(this.todate);
    if (!this.fromdate) {
      var dateFrom = this.convert_DT(new Date());
    }
    else {
      dateFrom = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = dateFrom;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }
 
    var q = this.time1.getHours();
    var q1 = this.time1.getMinutes();
    var newTime = q + ":" + q1;

    this.inspectionService.createInspections(this.TemplateID,this.SupervisorKey,dateFrom,date2,this.theCheckbox,newTime,this.RoomKey);
    
}
  ngOnInit() {

    this.inspectionService
    .getTemplateName()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.templateName = data;
    });
    this.inspectionService
    .getAuditorName()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.auditor = data;
    });
    this.inspectionService
    .getEmployeeName()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.employee = data;
    });
    this.inspectionService
    .getBuildingName()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.building = data;
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
