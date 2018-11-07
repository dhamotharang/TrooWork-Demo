import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../../service/inspection.service';
import { Inspection } from '../../../../model-class/Inspection';
@Component({
  selector: 'app-inspectiontemplate-create',
  templateUrl: './inspectiontemplate-create.component.html',
  styleUrls: ['./inspectiontemplate-create.component.scss']
})
export class InspectiontemplateCreateComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  ScoreTypeKey;
  InspTempName;
  

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

  scores: Inspection[];
  title = 'dynamicrow';
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  constructor(private inspectionService: InspectionService) { }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  valuesSave(ScoreTypeKey, InspTempName) {
   
    var ScoringTypeKey;
    var TemplateID;
    var templatename;
    if (ScoreTypeKey) {
      ScoringTypeKey = this.ScoreTypeKey;
      }
      else {
      ScoringTypeKey = null;
              alert("Scoring Type is not provided !");
              return;
      }
      if (InspTempName) {
        templatename = this.InspTempName;
        }
        else {
        templatename = null;
            alert("Inspection Template Name is not provided !");
                return;
        }
    var arr = [];
    var t1;
    for (var i in this.fieldArray) {
      arr.push(this.fieldArray[i]);
    }
    t1 = this.newAttribute;
    arr[arr.length] = t1;
    arr;
    this.fieldArray;
    var TempQustArry = [];
    var QustArry;
    for (var j = 0; j < arr.length; j++) {
      TempQustArry.push(arr[j].question);
    }
    QustArry = TempQustArry.join(',');
    // QustArry=TempQustArry;
    if (QustArry === ''){
      QustArry = null;
              alert(" Questions are not provided !");
              return;
      }
      this.inspectionService.checkforTemplate(InspTempName,this.OrganizationID).subscribe(res => {
        if (res[0].count == 0){
    this.inspectionService.createInspectionTemplate(ScoreTypeKey, InspTempName, QustArry, this.employeekey, this.OrganizationID).subscribe(res => {
    
      this.ScoreTypeKey = null;
    this.InspTempName = null;
    this.newAttribute.question=[];
    alert("Inspection Template Added !");
  });
  }
  else{
   
    this.ScoreTypeKey = null;
    this.InspTempName = null; 
    this.newAttribute.question=[];
     alert("Template Name already exists !");
}
  });
  }
  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;


    this.inspectionService
      .getScoreTypeList(this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.scores = data;
      });
  }

}
