import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InspectionService } from '../../../service/Inspection.service';
import { Inspection } from '../../../model-class/Inspection';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-inspectiontemplate-edit',
  templateUrl: './inspectiontemplate-edit.component.html',
  styleUrls: ['./inspectiontemplate-edit.component.scss']
})
export class InspectiontemplateEditComponent implements OnInit {
  inspectiontemplate :Inspection[];
  searchform: FormGroup;
  delete_tempid: number;
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
  deleteTemplate() {
    // debugger;
    this.inspectionService
      .DeleteTemplate(this.delete_tempid).subscribe(()=>{
        this.inspectionService
        .getInspectionTemplateDetails()
        .subscribe((data: Inspection[]) => {
          this.inspectiontemplate = data;
        });
      });  
  }

  deleteTemplatePass(TemplateID) {
    this.delete_tempid = TemplateID;
    // debugger;
  }
  searchTemplate(SearchValue) {
    this.inspectionService
      .SearchTemplate(SearchValue).subscribe((data: Inspection[]) => {
        this.inspectiontemplate = data;

      });

  };
  ngOnInit() {
    
      this.inspectionService
      .getInspectionTemplateDetails()
      .subscribe((data: Inspection[]) => {
        // debugger;
        this.inspectiontemplate = data;
      });
      this.searchform = this.formBuilder.group({
        SearchTemplate: ['', Validators.required]
      });
  }

}
