import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/inspection.service';
import { Inspection } from '../../../model-class/Inspection';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-viewinspectionmanager',
  templateUrl: './viewinspectionmanager.component.html',
  styleUrls: ['./viewinspectionmanager.component.scss']
})
export class ViewinspectionmanagerComponent implements OnInit {

  inspectioneddetails:Inspection[];
  OrgId:Number=21;
  ioKey$ :object;
  
  constructor(private route: ActivatedRoute,private router: Router,private inspectionService: InspectionService) { 
    this.route.params.subscribe(params => this.ioKey$ = params.InspectionOrderKey);
  }

  ngOnInit() {

    this.inspectionService
      .getViewInspectionManager(this.ioKey$,this.OrgId)
      .subscribe((data: Inspection[]) => {
        // debugger;
        this.inspectioneddetails = data;
      });

  }

}
