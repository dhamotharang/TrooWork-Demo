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
  searchFlag: any;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  FormtypeId;

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
      .getRecentUploads(this.employeekey, this.OrganizationID)
      .subscribe((data: Documents[]) => {
        this.searchFlag = true;
        this.viewFolderDescriptionTable = data;
      });
  }
  searchFNDN(SearchValue) {
    if (SearchValue.length >= 3){
    this.documentService
      .SearchFileNameandDescName(this.OrganizationID, SearchValue).subscribe((data: Documents[]) => {
        this.viewFolderDescriptionTable = data;

      });
    }
    else if (SearchValue.length == 0){
      var formtype;
      this.documentService
      .getFileDetailsTablewithDropdown(formtype, this.employeekey, this.OrganizationID).subscribe((data: Documents[]) => {
        this.searchFlag = true;
        this.viewFolderDescriptionTable = data;
      });
    }
  }
  showFileDetailsTablebydropdown(formtype) {
    this.documentService
      .getFileDetailsTablewithDropdown(formtype, this.employeekey, this.OrganizationID).subscribe((data: Documents[]) => {
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
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.FormtypeId="";
    this.documentService
      .getDocumentFolderNamesfordropdown(this.employeekey, this.OrganizationID)
      .subscribe((data: Documents[]) => {
        this.documentsList = data;
      });
    this.searchform = this.formBuilder.group({
      searchFileDescName: ['', Validators.required]
    });
  }

}
