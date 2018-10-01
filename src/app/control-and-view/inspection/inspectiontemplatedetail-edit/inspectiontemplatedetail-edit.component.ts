// *****Inspection template detail*****


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';
@Component({
  selector: 'app-inspectiontemplatedetail-edit',
  templateUrl: './inspectiontemplatedetail-edit.component.html',
  styleUrls: ['./inspectiontemplatedetail-edit.component.scss']
})
export class InspectiontemplatedetailEditComponent implements OnInit {
  tempID: Object;
  fieldArray: Inspection[];
  constructor(private route: ActivatedRoute,private inspectionService: InspectionService) {
    this.route.params.subscribe(params => this.tempID = params.TemplateID);
   }

  ngOnInit() {
  }

}
