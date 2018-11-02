import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{Reports} from '../../../../model-class/reports';
import {  ReportServiceService} from '../../../../service/report-service.service';
import { ExcelserviceService } from '../../../../service/excelservice.service';


@Component({
  selector: 'app-barcode-report',
  templateUrl: './barcode-report.component.html',
  styleUrls: ['./barcode-report.component.scss']
})
export class BarcodeReportComponent implements OnInit
 {

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


  Roomflag:any;
  Equipmentflag:any;
  facilitylist:Reports[];
  equipmenttypelist:Reports[];
  equipment:Reports[];
  floor:Reports[];
  zoneroom:Reports[];
  room:Reports[];
  viewBarcodeReport:Reports[];
  viewBarcodeEquipment:Reports[];
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  EquipmentTypeKey;
  EquipmentKey;
  newArray;

  public reportarray:Array<any> = [{
    RoomName:'',Barcode:'',Building:'',Floor:'',Zone:'',Roomtype:''
  }
  ]; 

  public reportarray1:Array<any> = [{
    EquipmentName:'',Barcode:'',EquipmentType:''
  }
  ]; 
  barcode: FormGroup;
  constructor(private fb: FormBuilder,private ReportServiceService:ReportServiceService,private excelService:ExcelserviceService)
  {
      this. barcode = fb.group({
      FacilityKey: ['', Validators.required],
      FacilityText: ['', Validators.required],
      EquipmentTypeKey: ['', Validators.required],
      EquipmentTypeText: ['', Validators.required],
      EquipmentTypeDescription: ['', Validators.required]
    
    });
  }
  ngOnInit() 
  {
     this.FacilityKey="";
     this.FloorKey="";
     this.ZoneKey="";
     this.RoomTypeKey="";
     this.EquipmentTypeKey="";
     this.EquipmentKey="";

     var token = localStorage.getItem('token');
     var encodedProfile = token.split('.')[1];
     var profile = JSON.parse(this.url_base64_decode(encodedProfile));
     this.role = profile.role;
     this.IsSupervisor = profile.IsSupervisor;
     this.name = profile.username;
     this.employeekey = profile.employeekey;
     this.OrganizationID = profile.OrganizationID;

      this.ReportServiceService
      .getBarcodeReport()
      .subscribe((data: Reports[]) =>
       {
      // debugger;
      this.facilitylist = data;
      });

      this.ReportServiceService.getEquipmentType()
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.newArray = data.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
        this.newArray.unshift({EquipmentTypeText: "Select All", EquipmentTypeKey: "-99"});
        // this.equipmenttypelist = data;
        this.equipmenttypelist = this.newArray;

        });
  
        this.ReportServiceService
      .getEquipment()
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.equipment= data;
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


  generateBarcodeReport(FacilityKey,FloorKey,RoomTypeKey,ZoneKey,EquipmentTypeKey,EquipmentKey)
  {
  // debugger;
  if(!this.FacilityKey && !this.EquipmentTypeKey && !this.EquipmentKey )
  {
    alert("Please choose any filter");
  }
  
  if(FacilityKey){
    
  this.ReportServiceService
  .generateBarcodeReportService(FacilityKey,FloorKey,RoomTypeKey,ZoneKey)
     .subscribe((data: Reports[]) =>
        {
          this.Roomflag=true;
          this.Equipmentflag=false;
       this.viewBarcodeReport= data;
       });

  }
  if(EquipmentTypeKey)
  {
   // debugger;
    this.ReportServiceService
    .generateBarcodeByEqupimenttype(EquipmentKey,EquipmentTypeKey,this.employeekey,this.OrganizationID)
     .subscribe((data: Reports[]) =>
        {
          this.Roomflag=false;
          this.Equipmentflag=true;
       this.viewBarcodeEquipment= data;
       });
  }
if(EquipmentKey)
{
  this.ReportServiceService
  .generateBarcodeByEqupiment(EquipmentKey,EquipmentTypeKey,this.employeekey,this.OrganizationID)
  .subscribe((data: Reports[]) =>
        {
          this.Roomflag=false;
          this.Equipmentflag=true;
       this.viewBarcodeEquipment= data;
       });
}

  }

   //export to excel 
   exportToExcel():void
   {
    // debugger;
    //export room table to excel
    if(this.viewBarcodeReport)
    {
      // this. Roomflag=true;
      // this.Equipmentflag=false;
       for(var i=0;i<this.viewBarcodeReport.length;i++)
        {
          this.reportarray.splice(i, 1);
           var room_id=(this.viewBarcodeReport[i].RoomId);
          var barcode=(this.viewBarcodeReport[i].Barcode1);
          var facname=(this.viewBarcodeReport[i].FacilityName);
          var flrname=(this.viewBarcodeReport[i].FloorName);
          var zname=(this.viewBarcodeReport[i].ZoneName);
          var rtype=(this.viewBarcodeReport[i].RoomType);
        
       
        
         if(this.viewBarcodeReport[i])
          {
          // var cur_status1='Inspection Completed';
             this.reportarray.push({RoomName:room_id,Barcode:barcode,Building:facname,Floor:flrname,Zone:zname,Roomtype:rtype})
          }
       
         }
         //debugger;
         if(this.Roomflag){
        this.excelService.exportAsExcelFile(this.reportarray, 'samplereport');
         }
    }

  





  
    //export equipment table to excel
    if(this.viewBarcodeEquipment)
    {
      // this. Roomflag=false;
      // this.Equipmentflag=true;
      //debugger;
       for(var i=0;i<this.viewBarcodeEquipment.length;i++)
        {
          this.reportarray.splice(i, 1);
           var eq_name=(this.viewBarcodeEquipment[i].EquipmentName);
          var barcode=(this.viewBarcodeEquipment[i].Barcode1);
          var eq_type=(this.viewBarcodeEquipment[i].EquipmentType);
          
        
       
        
         if(this.viewBarcodeEquipment[i])
          {
          // var cur_status1='Inspection Completed';
             this.reportarray1.push({EquipmentName:eq_name,Barcode:barcode,EquipmentType:eq_type})
          }
       
         }
 if(this.Equipmentflag){
        this.excelService.exportAsExcelFile(this.reportarray1, 'reportsample');
    }
    }

    }
     
  

}



 
  


  

