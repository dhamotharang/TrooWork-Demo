import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Reports} from '../../../model-class/reports';
import {ReportServiceService} from '../../../service/report-service.service'
@Component({
  selector: 'app-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.scss']
})
export class InspectionReportComponent implements OnInit {

   // adding properties and methods that will be used by the igxDatePicker
   public date: Date = new Date(Date.now());
   private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
   private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});
 
   public formatter = (_: Date) => {
       return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;

   }
   supervisoroptions: Reports[];  
  inspectionreport: FormGroup;
  constructor(private fb: FormBuilder,private ReportServiceService: ReportServiceService)
   {
    this. inspectionreport = fb.group({
      SupervisorKey: ['', Validators.required],
      SupervisorText: ['', Validators.required]
      });
   }

  ngOnInit() 
  {
    this.ReportServiceService
    .getallsupervisor()
    .subscribe((data: Reports[]) => {
      // debugger;
      this.supervisoroptions = data;
    });
  }

}