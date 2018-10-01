import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../model-class/reports';

import { ReportServiceService } from '../../../service/report-service.service';
import { ExcelserviceService } from '../../../service/excelservice.service';

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



   facilitylist:Reports[];
   floor:Reports[];
  zoneroom:Reports[];
  room:Reports[];
  rooms:Reports[];
  
  emp:Reports[];
  workstatus:Reports[];
  viewWorkorderReport:Reports[];

  constructor(private fb: FormBuilder,private ReportServiceService:ReportServiceService) { }

  ngOnInit()
   {
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
    debugger;
    this.ReportServiceService
   .getRooms(fkey,floorkey,zonekey)
   .subscribe((data: Reports[]) =>
   {
  debugger;
  this.rooms= data;
  });

  }

  generateWorkOrderReport(fromdate,todate,FacilityKey,FloorKey,RoomTypeKey,ZoneKey,RoomKey,Employeekey,WorkorderStatusKey)
  {
   debugger;
  
    
  this.ReportServiceService
  .generateWorkOrderReportService(FacilityKey,FloorKey,RoomTypeKey,ZoneKey,fromdate,todate,RoomKey,Employeekey,WorkorderStatusKey)
     .subscribe((data: Reports[]) =>
        {
          // this.Roomflag=true;
          // this.Equipmentflag=false;
       this.viewWorkorderReport= data;
       });

  
  
   
  

  }
}
