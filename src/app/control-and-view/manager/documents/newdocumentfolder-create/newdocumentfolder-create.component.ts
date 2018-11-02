import { Component, OnInit } from '@angular/core';
import { DocumentserviceService } from '../../../../service/documentservice.service';
import { Documents } from '../../../../model-class/Documents';
@Component({
  selector: 'app-newdocumentfolder-create',
  templateUrl: './newdocumentfolder-create.component.html',
  styleUrls: ['./newdocumentfolder-create.component.scss']
})
export class NewdocumentfolderCreateComponent implements OnInit {
  DocFolderName: any;

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

  constructor(private documentService: DocumentserviceService) { }

  addDocFold() {
    debugger;

    this.documentService.CreateNewDocumentFolder(this.DocFolderName, this.employeekey, this.OrganizationID).subscribe(res => console.log('Done'));
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

  }

}
