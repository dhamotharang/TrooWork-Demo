// *****Inspection template detail*****


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InspectionService } from '../../../service/inspection.service';
import { Inspection } from '../../../model-class/Inspection';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inspectiontemplatedetail-edit',
  templateUrl: './inspectiontemplatedetail-edit.component.html',
  styleUrls: ['./inspectiontemplatedetail-edit.component.scss']
})
export class InspectiontemplatedetailEditComponent implements OnInit {
  
  tempID;
  fieldArray;
  OrganizationID = 21;
  toServeremployeekey = 2861;
  scores;
  TemplateEditDetails;
  newAttribute = [];
  temparray = [];
  insertObj;

  constructor(private route: ActivatedRoute, private inspectionService: InspectionService, private router: Router) {
    this.route.params.subscribe(params => this.tempID = params.TemplateID);
   }

  ngOnInit() {
    this.inspectionService
    .scoringtype(this.OrganizationID).subscribe((data: any[]) => {
      
      this.scores = data;
    });
    this.inspectionService
    .getTemplateEditDetails( this.tempID, this.OrganizationID).subscribe((data: any[]) => {
      
      this.TemplateEditDetails = data[0];
    });
    this.inspectionService
    .getTemplateQuestionsEditDetails( this.tempID, this.OrganizationID).subscribe((data: any[]) => {
      
      this.fieldArray = data;
    });

  }
  addFieldValue() {
    this.newAttribute.push('');
}
addtempId(tempKeys) {
  debugger;
  this.temparray.push(tempKeys);
}
deleteFieldValue(TemplateQuestionID){
  this.inspectionService
  .deleteSelectedTemplateQuestion( TemplateQuestionID, this.OrganizationID).subscribe(() => {
    this.inspectionService
    .getTemplateQuestionsEditDetails( this.tempID, this.OrganizationID).subscribe((data: any[]) => {
      this.fieldArray = data;
    });
   
  });
}
deleteNewFieldValue(index){
  this.newAttribute.splice(index, 1);
}
savetemplate () {
  debugger;
 var temp_updateArry = this.fieldArray;
 var temp_insertArry = this.newAttribute;
var temp_TemplateQuestionID;
var temp_Question;
this.temparray;
 
  for (var j = 0; j < this.temparray.length; j++) {
    for (var i = 0; i < temp_updateArry.length; i++) {
      if ( this.temparray[j] === temp_updateArry[i].TemplateQuestionID ){
        temp_TemplateQuestionID=temp_updateArry[i].TemplateQuestionID;
        temp_Question=temp_updateArry[i].Question;
      }
  }
  this.insertObj = {
    templateid: temp_TemplateQuestionID,
    questionid: temp_Question,
    empkey:this.toServeremployeekey,
    OrganizationID:this.OrganizationID
  };
  this.inspectionService
  .updateEditedTemplateQuestion(this.insertObj).subscribe(() => {
  
  });

 }
 for (var j = 0; j < temp_insertArry.length; j++) {

    this.insertObj = {
      templateid: this.tempID,
      questionid: temp_insertArry[j],
      empKey:this.toServeremployeekey,
      OrganizationID:this.OrganizationID
    };

this.inspectionService
  .insertEditedTemplateQuestion(this.insertObj).subscribe(() => {
  
  });
 }
 this.inspectionService
  .updateTemplateDetails(this.TemplateEditDetails.TemplateName,this.tempID,this.OrganizationID,this.TemplateEditDetails.ScoreTypeKey).subscribe(() => {
    this.router.navigateByUrl('InspectiontemplateEdit');
  });

}

}
