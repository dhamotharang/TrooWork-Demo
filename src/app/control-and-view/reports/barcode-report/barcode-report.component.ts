import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{Reports} from '../../../model-class/reports';
import {  ReportServiceService} from '../../../service/report-service.service';

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
  barcode: FormGroup;
  constructor(private fb: FormBuilder,private ReportServiceService:ReportServiceService)
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

      this.ReportServiceService
      .getEquipmentType()
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.equipmenttypelist = data;
        });
  
        this.ReportServiceService
      .getEquipment()
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.equipment= data;
        });

   

  }

  getFloorDisp(FacilityKey)
  {
    debugger;
    this.ReportServiceService
  
   . getFloor(FacilityKey)
      .subscribe((data: Reports[]) =>
         {
       // debugger;
        this.floor= data;
        });
  }

  

}



 
  


  

