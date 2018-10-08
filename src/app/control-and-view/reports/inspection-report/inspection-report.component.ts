import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../model-class/reports';
import { ReportServiceService } from '../../../service/report-service.service';
import { ExcelserviceService } from '../../../service/excelservice.service';
@Component({
  selector: 'app-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.scss']
})
export class InspectionReportComponent implements OnInit {
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
  supervisoroptions: Reports[];
  inspectionreport: FormGroup;
  viewinspectionReport: Reports[];
  public reportarray: Array<any> = [{
    // Template: '', Date: '', Location: '', Auditor: '', Employee: '', Status: ''
  }
  ];
  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private excelService: ExcelserviceService) {
    this.inspectionreport = fb.group({
      SupervisorKey: ['', Validators.required],
      SupervisorText: ['', Validators.required]
    });
  }
  //export to excel 
  exportToExcel(): void {
    // debugger;
    for (var i = 0; i < this.viewinspectionReport.length; i++) {
      var temp_name = (this.viewinspectionReport[i].TemplateName);
      var ins_date = (this.viewinspectionReport[i].InspectionDate);
      var locationname = this.viewinspectionReport[i].FacilityName.concat('-', this.viewinspectionReport[i].RoomId);
      var auditorname = this.viewinspectionReport[i].LastName.concat(',', this.viewinspectionReport[i].FirstName);
      var employeename = (this.viewinspectionReport[i].EmployeeName);
      if (this.viewinspectionReport[i].InspectionCompletedBy !== null) {
        var cur_status1 = 'Inspection Completed';
        this.reportarray.push({ template: temp_name, Date: ins_date, Location: locationname, Auditor: auditorname, Employee: employeename, Status: cur_status1 })
      }
      else {
        var cur_status2 = 'Inspection not Completed';
        this.reportarray.push({ Template: temp_name, Date: ins_date, Location: locationname, Auditor: auditorname, Employee: employeename, Status: cur_status2 })
      }
    }

    this.excelService.exportAsExcelFile(this.reportarray, 'sample');
  }

  ngOnInit() {
    this.ReportServiceService
      .getallsupervisor()
      .subscribe((data: Reports[]) => {
        this.supervisoroptions = data;
      });
  }

  generateInspectionReport(from_date, to_date, SupervisorKey) {

    var fromdate = this.convert_DT(from_date);
    var todate = this.convert_DT(to_date);
    if (todate && fromdate > todate) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
    if (SupervisorKey == undefined) {
      this.ReportServiceService
        .getinspectionreport_bydate(fromdate, todate)
        .subscribe((data: Reports[]) => {
          this.viewinspectionReport = data;
        });
    }
    else {
      this.ReportServiceService
        .getinspectionreport(fromdate, todate, SupervisorKey)
        .subscribe((data: Reports[]) => {
          // debugger;
          this.viewinspectionReport = data;
        });
    }
  }

}