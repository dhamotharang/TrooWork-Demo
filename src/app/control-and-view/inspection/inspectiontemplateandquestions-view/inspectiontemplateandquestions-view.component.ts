import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';
@Component({
  selector: 'app-inspectiontemplateandquestions-view',
  templateUrl: './inspectiontemplateandquestions-view.component.html',
  styleUrls: ['./inspectiontemplateandquestions-view.component.scss']
})
export class InspectiontemplateandquestionsViewComponent implements OnInit {
  template: Inspection[];
  viewinspectionTemplate: Inspection[];
  delete_tempId:number;
  templateQuestionID :number;

  constructor(private inspectionService: InspectionService) { }
  
  showInspectionTemplateTable(tempKey){
    this.inspectionService
    .getInspectionTemplateTable(tempKey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.viewinspectionTemplate = data;
    });
  }
  deleteInspTemplate() {
    debugger;
    this.inspectionService
      .DeleteInspectionTemplate(this.delete_tempId, this.templateQuestionID).subscribe(()=>{
        // this.inspectionService
        // . getInspectionTemplateTable()
        // .subscribe((data: Inspection[]) => {
        //   this.viewinspectionTemplate = data;
        // });

      });

   
  }
  deleteInspTemplatePass(TemplateID,TemplateQuestionID) {
    this.delete_tempId = TemplateID;
    this.templateQuestionID=TemplateQuestionID;
    debugger;
  }
  ngOnInit() {
    this.inspectionService
    .getTemplateNameList()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.template = data;
    });
  }

}
