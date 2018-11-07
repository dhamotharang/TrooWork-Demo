import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InspectionService } from '../../../../service/inspection.service';
import { Inspection } from '../../../../model-class/Inspection';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-inspectiontemplate-edit',
  templateUrl: './inspectiontemplate-edit.component.html',
  styleUrls: ['./inspectiontemplate-edit.component.scss']
})
export class InspectiontemplateEditComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  pageNo: Number = 1;
  itemsPerPage: Number = 25;

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

  inspectiontemplate: Inspection[];
  searchform: FormGroup;
  delete_tempid: number;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  editQuestions;

  constructor(private formBuilder: FormBuilder, private inspectionService: InspectionService, private el: ElementRef, private router: Router) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }
  deleteTemplate() {
    this.inspectionService
      .DeleteTemplate(this.delete_tempid, this.employeekey, this.OrganizationID).subscribe(() => {
        this.inspectionService
          .getInspectionTemplateDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
          .subscribe((data: Inspection[]) => {
            this.inspectiontemplate = data;
          });
      });
  }

  deleteTemplatePass(TemplateID) {
    this.delete_tempid = TemplateID;
  }
  searchTemplate(SearchValue) {
    if (SearchValue.length >= 3){
    this.inspectionService
      .SearchTemplate(SearchValue, this.OrganizationID).subscribe((data: Inspection[]) => {
        this.inspectiontemplate = data;
      });
    }
    else if (SearchValue.length == 0)
    {
      this.inspectionService
      .getInspectionTemplateDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectiontemplate = data;
      });
    }
  };
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
      .getInspectionTemplateDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectiontemplate = data;
      });
    this.searchform = this.formBuilder.group({
      SearchTemplate: ['', Validators.required]
    });
  }
  editTemplateDetails(index, TemplateID) {
    this.inspectionService.checkforInspectionOnTemplate(TemplateID, this.OrganizationID).subscribe((data: any[]) => {

      if (data[0].count == 0) {
        // this.router.navigateByUrl('InspectiontemplatedetailEdit/'TemplateID);
        this.router.navigate(['/InspectiontemplatedetailEdit', TemplateID]);
      } else {
        this.editQuestions = index;
      }

    });
  }
  cancelTemplateDetails() {
    this.editQuestions = -1;
    this.inspectionService
      .getInspectionTemplateDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: Inspection[]) => {
        this.inspectiontemplate = data;
      });
  }
  submiteditInspectionTemplate(TemplateName, TemplateID, ScoreTypeKey) {

    this.inspectionService
      .updateEditInspection(TemplateName, TemplateID, ScoreTypeKey, this.OrganizationID).subscribe(() => {
        this.inspectionService
          .getInspectionTemplateDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: Inspection[]) => {
            this.inspectiontemplate = data;
          });
        this.editQuestions = -1;
      });
  }
}
