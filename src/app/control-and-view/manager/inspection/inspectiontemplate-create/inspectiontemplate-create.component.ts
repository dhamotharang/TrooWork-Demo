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
    debugger;
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
    this.inspectionService.createInspectionTemplate(ScoreTypeKey, InspTempName, QustArry, this.employeekey, this.OrganizationID);
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
        // debugger;
        this.scores = data;
      });
  }

}
