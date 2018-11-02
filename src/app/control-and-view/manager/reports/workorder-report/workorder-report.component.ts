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

  public convert_DT(str) 
  {
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
   facilitylist:Reports[];
   floor:Reports[];
  zoneroom:Reports[];
  room:Reports[];
  rooms:Reports[];
  FacilityKey;
  emp:Reports[];
  workstatus:Reports[];
  viewWorkorderReport:Reports[];
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  EmployeeKey;
  WorkorderStatusKey;

  public workexcel:Array<any> = [{
    WorkorderTypeName:'',DateandTime:'',Status:'',Employee:'',Room:'',Equipment:'',CheckinTime:'',CheckoutTime:'',Duration:'',DelayTime:'',Notes:''
  }
  ]; 

  constructor(private fb: FormBuilder,private ReportServiceService:ReportServiceService,private excelService:ExcelserviceService) { }

  ngOnInit()
   {
     this.FacilityKey="";
     this.FloorKey="";
     this.ZoneKey="";
     this.RoomTypeKey="";
     this.RoomKey="";
     this.EmployeeKey="";
     this.WorkorderStatusKey="";
    this.fromdate = new Date();
    this.ReportServiceService.getBarcodeReport().subscribe((data: Reports[]) =>
     {
    // debugger;
    this.facilitylist = data;
      });


      this.ReportServiceService.getEmployee().subscribe((data: Reports[]) =>
      {
     // debugger;
     this.emp = data;
       });

       this.ReportServiceService.getWorkstatus().subscribe((data: Reports[]) =>
      {
     // debugger;
     this.workstatus = data;
       });
   }

   getFloorDisp(key)
  {
  
    this.ReportServiceService.getFloor(key)
      .subscribe((data: Reports[]) =>
         {
       
        this.floor= data;
        });
  }

  getZoneRoom(floorkey,fkey)
  {
    //debugger;
    this.ReportServiceService
  
   .  getZone(fkey,floorkey)
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.zoneroom= data;
        });
       
        this.ReportServiceService
    .getRoom(fkey,floorkey)
    .subscribe((data: Reports[]) =>
    {
   //debugger;
   this.room= data;
   });
    

   
        
  }

  getRoomsName(zonekey,fkey,floorkey)
  {
   // debugger;
    this.ReportServiceService
   .getRooms(fkey,floorkey,zonekey)
   .subscribe((data: Reports[]) =>
   {
  //debugger;
  this.rooms= data;
  });

  }

  generateWorkOrderReport(from_date,to_date,FacilityKey,FloorKey,RoomTypeKey,ZoneKey,RoomKey,EmployeeKey,WorkorderStatusKey)
  {
   //debugger;
  var fromdate = this.convert_DT(from_date);
    var todate = this.convert_DT(to_date);
    if (todate && fromdate > todate) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
    
  this.ReportServiceService
  .generateWorkOrderReportService(FacilityKey,FloorKey,RoomTypeKey,ZoneKey,fromdate,todate,RoomKey,EmployeeKey,WorkorderStatusKey)
     .subscribe((data: Reports[]) =>
        {
          // this.Roomflag=true;
          // this.Equipmentflag=false;
          //debugger;
       this.viewWorkorderReport= data;
       });

  
  
   
  

  }

  //export to excel 
  exportToExcel():void
  {
   
     // this. Roomflag=true;
     // this.Equipmentflag=false;
      for(var i=0;i<this.viewWorkorderReport.length;i++)
       {
         this.workexcel.splice(i, 1);
          var Work_Type_Name=(this.viewWorkorderReport[i].WorkorderTypeName);
         
         var date_time = this.viewWorkorderReport[i].WorkorderDate.concat( this.viewWorkorderReport[i].WorkorderTime);
        
         var Work_status=(this.viewWorkorderReport[i].WorkorderStatus);
         var employee = this.viewWorkorderReport[i].LastName.concat( this.viewWorkorderReport[i].FirstName);
         var room_id=(this.viewWorkorderReport[i].RoomId);
         var eq_name=(this.viewWorkorderReport[i].EquipmentName);
         var check_in=(this.viewWorkorderReport[i].checkin);
         var check_out=(this.viewWorkorderReport[i].checkout);
         var duration=(this.viewWorkorderReport[i].duration); 
         var delay_time=(this.viewWorkorderReport[i].DelayTime);
         var work_notes=(this.viewWorkorderReport[i].WorkorderNotes);
       
      
       
        if(this.viewWorkorderReport[i])
         {
         // var cur_status1='Inspection Completed';
        //  var delay_time=(this.viewWorkorderReport[i].DelayTime);
         this.workexcel.push({WorkorderTypeName:Work_Type_Name,DateandTime:date_time,Status:Work_status,Employee:employee,Room:room_id,Equipment:eq_name,CheckinTime:check_in,CheckoutTime:check_out,Duration:duration,DelayTime:delay_time,Notes:work_notes
            
              })
         }
        }
        
        
       this.excelService.exportAsExcelFile(this.workexcel, 'samplereport');
        
        
  }

 


}
