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
  totalSunTime:number;
  ScheduleName:string;
  public excelarray: Array<any> = [{
    // Building:'',	Floor:'',	Zone:'',	Room:'',	FloorType:'',	RoomType:'',	Minutes:'',	Frequency:'',	Monday:'',	Tuesday:'',	Wednesday:'',	Thursday:'',	Friday:'',	Saturday:'',	Sunday:''
  }
  ];
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
        this.totalMonTime=0;
        this. totalTuesTime=0;
        this.totalWedTime=0;
        this.totalThuTime=0;
        this.totalFriTime=0;
        this.totalSatTime=0;
        this.totalSunTime=0;
        for (var i = 0; i < this.reportarray.length; i++) {
          var count = [];
          var y = this.reportarray[i]["OccurrenceInterval"];
          count = y.split(',');
          this.reportarray[i].dailyFrequency = count.length;
          
           debugger;
           if (this.reportarray[i].mon ==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                            this.totalMonTime = this.totalMonTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                            this.totalMonTime = this.totalMonTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].tue ==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                          this.totalTuesTime = this.totalTuesTime + ((this.reportarray[i].MetricValue) *this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                          this.totalTuesTime = this.totalTuesTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].wed ==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                          this.totalWedTime = this.totalWedTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                          this.totalWedTime = this.totalWedTime + ((this.reportarray[i].MetricValue) * this.reportarray[i].Area) *this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].thu == 1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                            this.totalThuTime = this.totalThuTime +((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                            this.totalThuTime = this.totalThuTime +((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].fri==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                          this.totalFriTime = this.totalFriTime +((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                          this.totalFriTime = this.totalFriTime +((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].sat==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                          this.totalSatTime = this.totalSatTime +((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                            this.totalSatTime = this.totalSatTime +((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    if (this.reportarray[i].sun==1)
                    {
                        if (this.reportarray[i].MetricType === 'Minutes Per')
                        {
                          this.totalSunTime = this.totalSunTime +((this.reportarray[i].MetricValue) * this.reportarray[i].dailyFrequency);
                        }
                        else
                        {
                          this.totalSunTime = this.totalSunTime +((this.reportarray[i].MetricValue) * this.reportarray[i].Area) * this.reportarray[i].dailyFrequency;
                        }
                    }
                    

        //   if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //     this.totalMonTime=this.totalMonTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // } 
        //  if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //     this.totalMonTime=this.totalMonTime+(this.reportarray[i].MetricValue);
        // }
        //  if(this.reportarray[i].mon==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalMonTime=this.totalMonTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].mon==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalMonTime=this.totalMonTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        
        
        // if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //      this.totalTuesTime= this.totalTuesTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        //  if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //      this.totalTuesTime= this.totalTuesTime+(this.reportarray[i].MetricValue);
        // }
        //  if(this.reportarray[i].tue==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalTuesTime=this.totalTuesTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].tue==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalTuesTime=this.totalTuesTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        // if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalWedTime=  this.totalWedTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        //  if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //      this.totalWedTime=  this.totalWedTime+(this.reportarray[i].MetricValue);
        // }
        //  if(this.reportarray[i].wed==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalWedTime=this.totalWedTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].wed==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalWedTime=this.totalWedTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        // if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalThuTime=  this.totalThuTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        // if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //      this.totalThuTime=  this.totalThuTime+(this.reportarray[i].MetricValue);
        // }
        //   if(this.reportarray[i].thu==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalThuTime=this.totalThuTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].thu==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalThuTime=this.totalThuTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        
        // if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalFriTime=  this.totalFriTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        // if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //      this.totalFriTime=  this.totalFriTime+(this.reportarray[i].MetricValue);
        // }
        //  if(this.reportarray[i].fri==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalFriTime=this.totalFriTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].fri==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalFriTime=this.totalFriTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        
        // if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalSatTime=   this.totalSatTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        // if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalSatTime=   this.totalSatTime+(this.reportarray[i].MetricValue);
        // }
        //   if(this.reportarray[i].sat==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalSatTime=this.totalSatTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].sat==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalSatTime=this.totalSatTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        //  if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalSunTime=  this.totalSunTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area);
        // }
        // if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency ===1){
        //       this.totalSunTime=   this.totalSunTime+(this.reportarray[i].MetricValue);
        // }
        //   if(this.reportarray[i].sun==1 && this.reportarray[i].MetricType!='Minutes Per' && this.reportarray[i].dailyFrequency>1 ){
        //     this.totalSunTime=this.totalSunTime+((this.reportarray[i].MetricValue)*this.reportarray[i].Area)*this.reportarray[i].dailyFrequency;
        // }
        //  if (this.reportarray[i].sun==1 && this.reportarray[i].MetricType=='Minutes Per' && this.reportarray[i].dailyFrequency>1){
        //     this.totalSunTime=this.totalSunTime+((this.reportarray[i].MetricValue)*this.reportarray[i].dailyFrequency); 
        // }
        }
      });
    
  }
  exportToExcel(): void {
    //this.excelarray.push({AssignmentArea:this.ScheduleName})
    for (var i = 0; i < this.reportarray.length; i++) {
      var buildingname=this.reportarray[i].FacilityName;
      var floorname=this.reportarray[i].FloorName;
      var zon_name=this.reportarray[i].ZoneName;
      var roomnum=this.reportarray[i].RoomId;
      var floor_type=this.reportarray[i].FloorTypeName;
      var room_type=this.reportarray[i].RoomType;
      if(this.reportarray[i].MetricType === 'Minutes Per')
      {
      var minute=this.reportarray[i].MetricValue;
      }
      else
      {
         minute=((this.reportarray[i].MetricValue)*(this.reportarray[i].Area));
      }
      var freq=this.reportarray[i].dailyFrequency;
      if(this.reportarray[i].mon==1)
      {
        var mondayvalue='X';
      }
      else
      {
        mondayvalue=''
      }
      if(this.reportarray[i].tue==1)
      {
        var tuesdayvalue='X';
      }
      else
      {
        tuesdayvalue=''
      }
      if(this.reportarray[i].wed==1)
      {
        var wednesdayvalue='X';
      }
      else
      {
        wednesdayvalue=''
      }
      if(this.reportarray[i].thu==1)
      {
        var thursdayvalue='X';
      }
      else
      {
        thursdayvalue=''
      }
      if(this.reportarray[i].fri==1)
      {
        var fridayvalue='X';
      }
      else
      {
        fridayvalue=''
      }
      if(this.reportarray[i].sat==1)
      {
        var saturdayvalue='X';
      }
      else
      {
        saturdayvalue=''
      }
      if(this.reportarray[i].sun==1)
      {
        var sundayvalue='X';
      }
      else
      {
        sundayvalue=''
      }
      debugger;
      this.excelarray.push({Building:buildingname,Floor:floorname,Zone:zon_name,Room:roomnum,FloorType:floor_type,	RoomType:room_type,	Minutes:minute,	Frequency:freq,	Monday:mondayvalue,	Tuesday:tuesdayvalue,	Wednesday:wednesdayvalue,	Thursday:thursdayvalue,	Friday:fridayvalue,	Saturday:saturdayvalue,	Sunday:sundayvalue})
      
    }
    this.excelarray.push('');
    this.excelarray.push({Building:'Total Assigned daily minutes',Monday:this.totalMonTime,Tuesday:this.totalTuesTime,Wednesday:this.totalWedTime,Thursday:this.totalThuTime,Friday:this.totalFriTime,Saturday:this.totalSatTime,Sunday:this.totalSunTime})
    
    this.excelService.exportAsExcelFile(this.excelarray, 'sample');
  }

}
