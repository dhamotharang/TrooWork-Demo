import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Reports} from '../../../model-class/reports';
import {ReportServiceService} from '../../../service/report-service.service';
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
   private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
   private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});
 
   public formatter = (_: Date) => {
       return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;

   }
   supervisoroptions: Reports[];  
    inspectionreport: FormGroup;
    viewinspectionReport: Reports[];
    constructor(private fb: FormBuilder,private ReportServiceService: ReportServiceService,private excelService:ExcelserviceService)
    {
    this. inspectionreport = fb.group({
      SupervisorKey: ['', Validators.required],
      SupervisorText: ['', Validators.required]
      });
   }
   exportToExcel():void {
    this.excelService.exportAsExcelFile(this.viewinspectionReport, 'sample');
  }

  ngOnInit() 
  {
    this.ReportServiceService
    .getallsupervisor()
    .subscribe((data: Reports[]) => {
      this.supervisoroptions = data;
    });
  }

  generateInspectionReport(from_date,to_date,SupervisorKey)
  {
    var fromdate= this.convert_DT(from_date);
    var todate= this.convert_DT(to_date);
    
    if (todate && fromdate > todate) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
    if(SupervisorKey==undefined)
    {
      this.ReportServiceService
    .getinspectionreport_bydate(fromdate,todate)
    .subscribe((data: Reports[]) => {
      this.viewinspectionReport = data;});
    }
    else
    {
    this.ReportServiceService
    .getinspectionreport(fromdate,todate,SupervisorKey)
    .subscribe((data: Reports[]) => {
      // debugger;
      this.viewinspectionReport = data;});
    } 
  }

}