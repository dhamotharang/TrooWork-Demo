import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Reports} from '../../../model-class/reports';
import {ReportServiceService} from '../../../service/report-service.service';
import { PieChartConfig } from '../../../extra-files/piechart-file/Models/PieChartConfig';
@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {
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
    employeeoption: Reports[];  
    dashboardreport: FormGroup;
    workordertypeoption: Reports[];
    reporttable: Reports[];
    pievalues: Reports[];
    data1: any[];
    config1: PieChartConfig;
    elementId1: String;
    dropdownSettings = {};
  constructor(private fb: FormBuilder,private ReportServiceService: ReportServiceService)
   {
    this. dashboardreport = fb.group({
      EmployeeKey: ['', Validators.required],
      EmployeeText: ['', Validators.required]
      });
   }

  ngOnInit() {
    var currentdate = this.convert_DT(new Date());
    var currentdate1 = this.convert_DT(new Date());
    this.ReportServiceService
    .getallemployee()
    .subscribe((data: Reports[]) => {
      this.employeeoption = data;
    });
    this.ReportServiceService
    .getallworkordertype()
    .subscribe((data: Reports[]) => {
      this.workordertypeoption = data;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'WorkorderTypeKey',
      textField: 'WorkorderTypeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    var em_Key=null;
    var Workorder_TypeKey=null;
    this.ReportServiceService
    .getdashboardreport(currentdate,currentdate1,em_Key,Workorder_TypeKey)
    .subscribe((data: Reports[]) => {
      this.reporttable = data;
    });
    debugger;
    this.ReportServiceService
    .getpievalues(currentdate)
    .subscribe((data: Reports[]) => {
      this.pievalues = data;
    });
    this.data1=[['Task', 'Hours per Day'],
    ['Eat',      3],
    ['Commute',  2],
    ['Watch TV', 5],
    ['Video games', 4],
    ['Sleep',    10]];
    this.config1 = new PieChartConfig('piechart', 0.4);
    this.elementId1 = 'myPieChart1';
  }
  onItemSelect (item:any) {
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
  }


}
