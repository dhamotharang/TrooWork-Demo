import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { DocumentserviceService } from '../../../../service/documentservice.service';
import { Documents } from '../../../../model-class/Documents';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
// import {saveAs as importedSaveAs} from "file-saver";
// import { Http, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {
  searchform: FormGroup;
  documentsList: Documents[];
  viewFolderDescriptionTable: Documents[];
  orgID: number;
  empkey: number;
  searchFlag: any;
  // id:any;
  // fileName:any;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private documentService: DocumentserviceService, private el: ElementRef) { }
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
  RecentUpdates() {
    this.documentService
      .getRecentUploads(this.empkey, this.orgID)
      .subscribe((data: Documents[]) => {
        this.searchFlag = true;
        this.viewFolderDescriptionTable = data;
      });
  }
  searchFNDN(SearchValue) {
    this.documentService
      .SearchFileNameandDescName(this.orgID, SearchValue).subscribe((data: Documents[]) => {
        this.viewFolderDescriptionTable = data;

      });
  }
  showFileDetailsTablebydropdown(formtype) {
    this.documentService
      .getFileDetailsTablewithDropdown(formtype, this.empkey, this.orgID).subscribe((data: Documents[]) => {
        this.searchFlag = true;
        this.viewFolderDescriptionTable = data;
      });
  }
  // downloadFile(){
  //   return this.http
  //   .get('https://jslim.net/path/to/file/download', {
  //     responseType: ResponseContentType.Blob
  //     // search:
  //   })
  //   .map(res => {
  //     return {
  //       filename: 'filename.pdf',
  //       data: res.blob()
  //     };
  //   })
  //   .subscribe(res => {
  //       console.log('start download:',res);
  //       var url = window.URL.createObjectURL(res.data);
  //       var a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.setAttribute('style', 'display: none');
  //       a.href = url;
  //       a.download = res.filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove(); // remove the element
  //     }, error => {
  //       console.log('download error:', JSON.stringify(error));
  //     }, () => {
  //       console.log('Completed file download.')
  //     });
  // }

  ngOnInit() {
    this.empkey = 2861;
    this.orgID = 21;
    this.documentService
      .getDocumentFolderNamesfordropdown(this.empkey, this.orgID)
      .subscribe((data: Documents[]) => {
        this.documentsList = data;
      });
    this.searchform = this.formBuilder.group({
      searchFileDescName: ['', Validators.required]
    });
  }

}
