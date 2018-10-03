import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';

@Component({
  selector: 'app-inspection-create',
  templateUrl: './inspection-create.component.html',
  styleUrls: ['./inspection-create.component.scss']
})
export class InspectionCreateComponent implements OnInit {
  templateName: Inspection[];
  auditor: Inspection[];
  employee: Inspection[];
  building:Inspection[];
  floors:Inspection[];
  zone:Inspection[];
  room:Inspection[];
  roomtype:Inspection[];
  facikey: Number;
// adding properties and methods that will be used by the igxDatePicker
public date: Date = new Date(Date.now());

private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});

public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
}

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

}
