import { Component, OnInit } from '@angular/core';
import { DocumentserviceService } from '../../../service/documentservice.service';
import { Documents } from '../../../model-class/Documents';
@Component({
  selector: 'app-newdocumentfolder-create',
  templateUrl: './newdocumentfolder-create.component.html',
  styleUrls: ['./newdocumentfolder-create.component.scss']
})
export class NewdocumentfolderCreateComponent implements OnInit {
  orgID:number;
  servempkey:number;
  DocFolderName:any;

  constructor(private documentService: DocumentserviceService) { }

  addDocFold() {
    this.orgID=21;
    this.servempkey=2861;
    debugger;
 
    this.documentService.CreateNewDocumentFolder(this.DocFolderName,this.servempkey,this.orgID).subscribe(res => console.log('Done'));
}
  ngOnInit() {
  }

}
