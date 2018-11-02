import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../../model-class/reports';
import { ReportServiceService } from '../../../../service/report-service.service';
import { ExcelserviceService } from '../../../../service/excelservice.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-batch-schedule-assignment-report',
  templateUrl: './batch-schedule-assignment-report.component.html',
  styleUrls: ['./batch-schedule-assignment-report.component.scss']
})
export class BatchScheduleAssignmentReportComponent implements OnInit {
  bacthschedules: Reports[];
  reportarray: Reports[];
  ScheduleName: string;
  batchschedule: FormGroup;
  totalMonTime: number;
  totalTuesTime: number;
  totalWedTime: number;
  totalThuTime: number;
  totalFriTime: number;
  totalSatTime: number;
  totalSunTime: number;
  workorderNotes: string;

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


  public excelarray: Array<any> = [{
    // Building:'',	Floor:'',	Zone:'',	Room:'',	FloorType:'',	RoomType:'',	Minutes:'',	Frequency:'',	Monday:'',	Tuesday:'',	Wednesday:'',	Thursday:'',	Friday:'',	Saturday:'',	Sunday:''
  }
  ];
  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private excelService: ExcelserviceService) {
    this.batchschedule = fb.group({
      BatchScheduleNameKey: ['', Validators.required],
      ScheduleName: ['', Validators.required]
    });
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

    this.ReportServiceService
      .getallbatchschedules(this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.bacthschedules = data;
      });
  }
  getBatchSchedule(Workorder_ScheduleKey) {
    this.ReportServiceService
      .getScheduleAssignReport(Workorder_ScheduleKey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.reportarray = data;
        this.totalMonTime = 0;
        this.totalTuesTime = 0;
        this.totalWedTime = 0;
        this.totalThuTime = 0;
        this.totalFriTime = 0;
        this.totalSatTime = 0;
        this.totalSunTime = 0;
        if (this.reportarray) {
          this.workorderNotes = this.reportarray[0].WorkorderNotes;
        }

        for (var i = 0; i < this.reportarray.length; i++) {
          var count = [];
          if (this.reportarray[i].Mon == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalMonTime = this.totalMonTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalMonTime = this.totalMonTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Tue == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalTuesTime = this.totalTuesTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalTuesTime = this.totalTuesTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Wed == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalWedTime = this.totalWedTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalWedTime = this.totalWedTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Thu == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalThuTime = this.totalThuTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalThuTime = this.totalThuTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Fri == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalFriTime = this.totalFriTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalFriTime = this.totalFriTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Sat == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalSatTime = this.totalSatTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalSatTime = this.totalSatTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
          if (this.reportarray[i].Sun == 'true') {
            if (this.reportarray[i].MetricType === 'Minutes Per') {
              this.totalSunTime = this.totalSunTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Frequency);
            }
            else {
              this.totalSunTime = this.totalSunTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].Frequency;
            }
          }
        }
      });

  }
  exportToExcel(): void {
    //this.excelarray.push({AssignmentArea:this.ScheduleName})
    for (var i = 0; i < this.reportarray.length; i++) {
      var buildingname = this.reportarray[i].FacilityName;
      var floorname = this.reportarray[i].FloorName;
      var zon_name = this.reportarray[i].ZoneName;
      var roomnum = this.reportarray[i].RoomId;
      var floor_type = this.reportarray[i].FloorTypeName;
      var room_type = this.reportarray[i].RoomType;
      if (this.reportarray[i].MetricType === 'Minutes Per') {
        var minute = this.reportarray[i].MetricValue;
      }
      else {
        minute = ((this.reportarray[i].MetricValue) * (this.reportarray[i].Area));
      }
      var freq = this.reportarray[i].Frequency;
      if (this.reportarray[i].Mon == 'true') {
        var mondayvalue = 'X';
      }
      else {
        mondayvalue = ''
      }
      if (this.reportarray[i].Tue == 'true') {
        var tuesdayvalue = 'X';
      }
      else {
        tuesdayvalue = ''
      }
      if (this.reportarray[i].Wed == 'true') {
        var wednesdayvalue = 'X';
      }
      else {
        wednesdayvalue = ''
      }
      if (this.reportarray[i].Thu == 'true') {
        var thursdayvalue = 'X';
      }
      else {
        thursdayvalue = ''
      }
      if (this.reportarray[i].Fri == 'true') {
        var fridayvalue = 'X';
      }
      else {
        fridayvalue = ''
      }
      if (this.reportarray[i].Sat == 'true') {
        var saturdayvalue = 'X';
      }
      else {
        saturdayvalue = ''
      }
      if (this.reportarray[i].Sun == 'true') {
        var sundayvalue = 'X';
      }
      else {
        sundayvalue = ''
      }
      if (this.reportarray[i].IsPhotoRequired == 1) {
        var photovalue = 'X';
      }
      else {
        photovalue = ''
      }
      if (this.reportarray[i].IsBarcodeRequired == 1) {
        var barcodevalue = 'X';
      }
      else {
        barcodevalue = ''
      }

      this.excelarray.push({ Building: buildingname, Floor: floorname, Zone: zon_name, Room: roomnum, FloorType: floor_type, RoomType: room_type, Minutes: minute, Frequency: freq, Monday: mondayvalue, Tuesday: tuesdayvalue, Wednesday: wednesdayvalue, Thursday: thursdayvalue, Friday: fridayvalue, Saturday: saturdayvalue, Sunday: sundayvalue, IsPhotoRequired: photovalue, IsBarcodeRequired: barcodevalue })

    }
    this.excelarray.push('');
    this.excelarray.push({ Building: 'Total Assigned daily minutes', Monday: this.totalMonTime, Tuesday: this.totalTuesTime, Wednesday: this.totalWedTime, Thursday: this.totalThuTime, Friday: this.totalFriTime, Saturday: this.totalSatTime, Sunday: this.totalSunTime })
    var temp_Report = [{}];
    temp_Report.push({ AssignmentArea: 'assignment1' });
    var newarr = [{}];
    newarr.push(temp_Report);
    newarr.push(this.excelarray);
    this.excelService.exportAsExcelFile(this.excelarray, 'sample');
  }
}


