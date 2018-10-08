import { Component, OnInit,OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DocumentserviceService } from '../../../service/documentservice.service';
import { Documents } from '../../../model-class/Documents';
@Component({
  selector: 'app-documentfolder-view',
  templateUrl: './documentfolder-view.component.html',
  styleUrls: ['./documentfolder-view.component.scss']
})
export class DocumentfolderViewComponent implements OnInit {

  searchform: FormGroup;
  documents:Documents[];
  orgID:number;
  empkey:number;

  //validation starts ..... @Pooja
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder,private documentService: DocumentserviceService, private el: ElementRef) { }
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

  //validation ends ..... @Pooja

  searchDocumentFolder(SearchValue) {
    this.orgID=21;
    this.documentService
      .SearchDocFolder(this.orgID,SearchValue).subscribe((data: Documents[]) => {
        this.documents = data;

      });

  };

  ngOnInit() {
   this.orgID=21;
   this.empkey=2861;
    this.documentService
      .getDocumentFoldersDataTable(this.empkey,this.orgID)
      .subscribe((data: Documents[]) => {
        this.documents = data;
      });

    this.searchform = this.formBuilder.group({
      SearchDocFol: ['', Validators.required]
    });
  }

}
