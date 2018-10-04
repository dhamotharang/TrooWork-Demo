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
  time:any;
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
  
  createInspection(TemplateID,SupervisorKey,fromdate,todate,theCheckbox,time,RoomKey) {
    debugger;
    var t=new Date();
    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();
    
         var today_DT = this.convert_DT(new Date());
                    
    //var x=new Date(t.getFullYear(),t.getMonth(),t.getDate()).join(-);
    //console.log(x);
    //console.log(y+"-"+m+"-"+d+" "+h+":"+mi+":"+s);
    var p="";
    p=today_DT+" "+h+":"+mi+":"+s;
 
    this.inspectionService.createInspections(this.TemplateID,this.SupervisorKey,this.fromdate,this.todate,this.theCheckbox,this.time,this.RoomKey);
    
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
