import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{Reports} from '../../../model-class/reports';
import {  ReportServiceService} from '../../../service/report-service.service';
import { ExcelserviceService } from '../../../service/excelservice.service';


@Component({
  selector: 'app-barcode-report',
  templateUrl: './barcode-report.component.html',
  styleUrls: ['./barcode-report.component.scss']
})
export class BarcodeReportComponent implements OnInit
 {

  facilitylist:Reports[];
  equipmenttypelist:Reports[];
  equipment:Reports[];
  floor:Reports[];
  zoneroom:Reports[];
  room:Reports[];
  viewBarcodeReport:Reports[];
  viewBarcodeEquipment:Reports[];

  public reportarray:Array<any> = [{
    RoomName:'',Barcode:'',Building:'',Floor:'',Zone:'',Roomtype:''
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
       var newArray = data.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
                // newArray.unshift({EquipmentTypeText: "Select All", EquipmentTypeKey: "-99"});
        // this.equipmenttypelist = data;
        this.equipmenttypelist = newArray;

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
   debugger;
  if(FacilityKey){
    
  this.ReportServiceService
  .generateBarcodeReportService(FacilityKey,FloorKey,RoomTypeKey,ZoneKey)
     .subscribe((data: Reports[]) =>
        {
      
       this.viewBarcodeReport= data;
       });

  }
  if(EquipmentTypeKey)
  {
    debugger;
    this.ReportServiceService
    .generateBarcodeByEqupiment(EquipmentKey,EquipmentTypeKey)
     .subscribe((data: Reports[]) =>
        {
      
       this.viewBarcodeEquipment= data;
       });
  }


  }

   //export to excel 
   exportToExcel():void{
    debugger;
    if(this.viewBarcodeReport)
    {
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

  this.excelService.exportAsExcelFile(this.reportarray, 'samplereport');
}

    }
     
  

}



 
  


  

