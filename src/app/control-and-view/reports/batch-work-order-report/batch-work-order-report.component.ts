import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../model-class/reports';
import { ReportServiceService } from '../../../service/report-service.service';
import { ExcelserviceService } from '../../../service/excelservice.service';
@Component({
  selector: 'app-batch-work-order-report',
  templateUrl: './batch-work-order-report.component.html',
  styleUrls: ['./batch-work-order-report.component.scss']
})
export class BatchWorkOrderReportComponent implements OnInit {
  bacthschedules: Reports[];
  reportarray: Reports[];
  dailyFrequency: number;
  batchworkorder: FormGroup;
  totalMonTime:number;
  totalTuesTime:number;
  totalWedTime:number;
  totalThuTime:number;
  totalFriTime:number;
  totalSatTime:number;
  totalSunTime:number
  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private excelService: ExcelserviceService) {
    this.batchworkorder = fb.group({
      BatchScheduleNameKey: ['', Validators.required],
      ScheduleName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ReportServiceService
      .getallbatchschedules()
      .subscribe((data: Reports[]) => {
        this.bacthschedules = data;
      });
  }
  getBatchSchedule(Workorder_ScheduleKey) {
    debugger;
    this.ReportServiceService
      .getbatchschedulereport(Workorder_ScheduleKey)
      .subscribe((data: Reports[]) => {
        this.reportarray = data;
        for (var i = 0; i < this.reportarray.length; i++) {
          var count = [];
          var y = this.reportarray[i]["OccurrenceInterval"];
          count = y.split(',');
          this.reportarray[i].dailyFrequency = count.length;
           this.totalMonTime=0;
           this. totalTuesTime=0;
           this.totalWedTime=0;
           this.totalThuTime=0;
           this.totalFriTime=0;
           this.totalSatTime=0;
           this.totalSunTime=0;
          //  if (this.reportarray[i].check_mon === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                   this.totalMonTime = this.totalMonTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                   this.totalMonTime = this.totalMonTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_tue === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                 this.totalTuesTime = this.totalTuesTime + (parseFloat(this.reportarray[i].MetricValue) *this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                 this.totalTuesTime = this.totalTuesTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_wed === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                 this.totalWedTime = this.totalWedTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                 this.totalWedTime = this.totalWedTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) *this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_thu === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                   this.totalThuTime = this.totalThuTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                   this.totalThuTime = this.totalThuTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_fri === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                 this.totalFriTime = this.totalFriTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                 this.totalFriTime = this.totalFriTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_sat === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                 this.totalSatTime = this.totalSatTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                   this.totalSatTime = this.totalSatTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }
          //           if (this.reportarray[i].check_sun === true)
          //           {
          //               if (this.reportarray[i].MetricType === 'Minutes Per')
          //               {
          //                 this.totalSunTime = this.totalSunTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
          //               }
          //               else
          //               {
          //                 this.totalSunTime = this.totalSunTime + (parseFloat(this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
          //               }
          //           }


          if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
            this.totalMonTime=this.totalMonTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        } 
         if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
            this.totalMonTime=this.totalMonTime+parseFloat(this.reportarray[i].MetricValue);
        }
         if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalMonTime=this.totalMonTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].mon==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalMonTime=this.totalMonTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        
        
        if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
             this.totalTuesTime= this.totalTuesTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
         if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
             this.totalTuesTime= this.totalTuesTime+parseFloat(this.reportarray[i].MetricValue);
        }
         if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalTuesTime=this.totalTuesTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].tue==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalTuesTime=this.totalTuesTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalWedTime=  this.totalWedTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
         if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
             this.totalWedTime=  this.totalWedTime+parseFloat(this.reportarray[i].MetricValue);
        }
         if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalWedTime=this.totalWedTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].wed==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalWedTime=this.totalWedTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalThuTime=  this.totalThuTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
        if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
             this.totalThuTime=  this.totalThuTime+parseFloat(this.reportarray[i].MetricValue);
        }
          if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalThuTime=this.totalThuTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].thu==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalThuTime=this.totalThuTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        
        if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalFriTime=  this.totalFriTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
        if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
             this.totalFriTime=  this.totalFriTime+parseFloat(this.reportarray[i].MetricValue);
        }
         if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalFriTime=this.totalFriTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].fri==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalFriTime=this.totalFriTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        
        if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalSatTime=   this.totalSatTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
        if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalSatTime=   this.totalSatTime+parseFloat(this.reportarray[i].MetricValue);
        }
          if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalSatTime=this.totalSatTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].sat==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalSatTime=this.totalSatTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
         if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalSunTime=  this.totalSunTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area;
        }
        if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
              this.totalSunTime=   this.totalSunTime+parseFloat(this.reportarray[i].MetricValue);
        }
          if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
            this.totalSunTime=this.totalSunTime+(parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        }
         if (this.reportarray[i].sun==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
            this.totalSunTime=this.totalSunTime+parseFloat(this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency; 
        }
        }
      });
    
  }

}
