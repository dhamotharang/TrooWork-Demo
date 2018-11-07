import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../../model-class/reports';

import { ReportServiceService } from '../../../../service/report-service.service';
import { ExcelserviceService } from '../../../../service/excelservice.service';

@Component({
  selector: 'app-workorder-report',
  templateUrl: './workorder-report.component.html',
  styleUrls: ['./workorder-report.component.scss']
})
export class WorkorderReportComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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


  fromdate: Date;
  facilitylist: Reports[];
  floor: Reports[];
  zoneroom: Reports[];
  room: Reports[];
  rooms: Reports[];
  FacilityKey;
  emp: Reports[];
  workstatus: Reports[];
  viewWorkorderReport: Reports[];
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  EmployeeKey;
  WorkorderStatusKey;
  todate:Date;

  public workexcel: Array<any> = [{
    WorkorderTypeName: '', DateandTime: '', Status: '', Employee: '', Room: '', Equipment: '', CheckinTime: '', CheckoutTime: '', Duration: '', DelayTime: '', Notes: ''
  }];

  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private excelService: ExcelserviceService) { }

  ngOnInit() {
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.EmployeeKey = "";
    this.WorkorderStatusKey = "";
    this.fromdate = new Date();

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.ReportServiceService.getBarcodeReport(this.employeekey, this.OrganizationID).subscribe((data: Reports[]) => {
      this.facilitylist = data;
    });


    this.ReportServiceService.getEmployee(this.employeekey, this.OrganizationID).subscribe((data: Reports[]) => {
      this.emp = data;
    });

    this.ReportServiceService.getWorkstatus(this.employeekey, this.OrganizationID).subscribe((data: Reports[]) => {
      this.workstatus = data;
    });
  }

  getFloorDisp(key) {

    this.ReportServiceService.getFloor(key, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.floor = data;
      });
  }

  getZoneRoom(floorkey, fkey) {
    this.ReportServiceService.getZone(fkey, floorkey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.zoneroom = data;
      });

    this.ReportServiceService
      .getRoomtype(fkey, floorkey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.room = data;
      });

      this.ReportServiceService
      .getRoom(fkey, floorkey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.rooms = data;
      });

  }

  getRoomsName(zonekey, fkey, floorkey) {
    this.ReportServiceService
      .getRooms(fkey, floorkey, zonekey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.rooms = data;
      });

  }

  generateWorkOrderReport(from_date, to_date, FacilityKey, FloorKey, RoomTypeKey, ZoneKey, RoomKey, EmployeeKey, WorkorderStatusKey) {
    if (!(this.todate) ) {
     
       var date1 = this.convert_DT(this.fromdate);
       if(!FacilityKey){
        FacilityKey=null;
       }
       if(!FloorKey){
        FloorKey=null;
       }
       if(!RoomTypeKey){
        RoomTypeKey=null;
       }
       if(!ZoneKey){
        ZoneKey=null;
       }
       if(!RoomTypeKey){
        RoomTypeKey=null;
       }
       if(!RoomKey){
        RoomKey=null;
       }
       if(!EmployeeKey){
        EmployeeKey=null;
       }
       if(!WorkorderStatusKey){
        WorkorderStatusKey=null;
       }
       var fromdate = this.convert_DT(from_date);
       this.ReportServiceService
      .generateWorkOrderReportServicewithdate(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, date1, RoomKey, EmployeeKey, WorkorderStatusKey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.viewWorkorderReport = data;
      });
    }

    var fromdate = this.convert_DT(from_date);
    var todate = this.convert_DT(to_date);
    if (todate && fromdate > todate) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
else{
    this.ReportServiceService
      .generateWorkOrderReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, todate, RoomKey, EmployeeKey, WorkorderStatusKey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.viewWorkorderReport = data;
      });
  }
  }
  //export to excel 
  exportToExcel(): void {

    for (var i = 0; i < this.viewWorkorderReport.length; i++) {
      this.workexcel.splice(i, 1);
      var Work_Type_Name = (this.viewWorkorderReport[i].WorkorderTypeName);

      var date_time = this.viewWorkorderReport[i].WorkorderDate.concat(this.viewWorkorderReport[i].WorkorderTime);

      var Work_status = (this.viewWorkorderReport[i].WorkorderStatus);
      var employee = this.viewWorkorderReport[i].LastName.concat(this.viewWorkorderReport[i].FirstName);
      var room_id = (this.viewWorkorderReport[i].RoomId);
      var eq_name = (this.viewWorkorderReport[i].EquipmentName);
      var check_in = (this.viewWorkorderReport[i].checkin);
      var check_out = (this.viewWorkorderReport[i].checkout);
      var duration = (this.viewWorkorderReport[i].duration);
      var delay_time = (this.viewWorkorderReport[i].DelayTime);
      var work_notes = (this.viewWorkorderReport[i].WorkorderNotes);

      if (this.viewWorkorderReport[i]) {
        this.workexcel.push({
          WorkorderTypeName: Work_Type_Name, DateandTime: date_time, Status: Work_status, Employee: employee, Room: room_id, Equipment: eq_name, CheckinTime: check_in, CheckoutTime: check_out, Duration: duration, DelayTime: delay_time, Notes: work_notes
        })
      }
    }
    this.excelService.exportAsExcelFile(this.workexcel, 'samplereport');
  }
}
