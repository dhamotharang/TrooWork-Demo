import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-inspectiontemplateandquestions-view',
  templateUrl: './inspectiontemplateandquestions-view.component.html',
  styleUrls: ['./inspectiontemplateandquestions-view.component.scss']
})
export class InspectiontemplateandquestionsViewComponent implements OnInit {
  searchform: FormGroup;
  // searchTemplateNameAndQuestion:Inspection[];
  template: Inspection[];
  viewinspectionTemplate: Inspection[];
  delete_tempId:number;
  templateQuestionID :number;
  key :number;
  searchFlag:any;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder,private inspectionService: InspectionService, private el: ElementRef) { }
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
  showInspectionTemplateTable(tempKey){
    this.inspectionService
    .getInspectionTemplateTable(tempKey)
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.searchFlag=true;
      this.viewinspectionTemplate = data;
    });
  }
  deleteInspTemplate() {
    debugger;
    this.inspectionService
      .DeleteInspectionTemplate(this.delete_tempId,this.templateQuestionID).subscribe(()=>{
        this.inspectionService
        . getInspectionTemplateTable(this.key)
        .subscribe((data: Inspection[]) => {
          this.viewinspectionTemplate = data;
        });

      });  
  }
  deleteInspTemplatePass(templateID,templateQuestionID) {
    this.delete_tempId = templateID;
    this.templateQuestionID=templateQuestionID;
    debugger;
  }
  searchTNandTQ(SearchValue,TemplateID){
    this.inspectionService
    .SearchTempNameandQuestion(SearchValue,TemplateID).subscribe((data: Inspection[]) => {
      this.viewinspectionTemplate = data;

    });
  }
  ngOnInit() {
    this.searchFlag=false;
    this.inspectionService
    .getTemplateNameList()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.template = data;
    });
    this.searchform = this.formBuilder.group({
      searchTemplateNameAndQuestion: ['', Validators.required]
    });
  }

}
