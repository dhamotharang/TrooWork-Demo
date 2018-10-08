import { Component, OnInit } from '@angular/core';
import { DocumentserviceService } from '../../../service/documentservice.service';
import { Documents } from '../../../model-class/Documents';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-documentfolder-edit',
  templateUrl: './documentfolder-edit.component.html',
  styleUrls: ['./documentfolder-edit.component.scss']
})
export class DocumentfolderEditComponent implements OnInit {
  orgID: number;
  empkey:number;
  folder;
  folder$: Object;
  // folder.FormType:any;

  constructor(private route: ActivatedRoute, private documentService: DocumentserviceService, private router: Router) {
    this.route.params.subscribe(params => this.folder$ = params.FormtypeId);
  }

  updateFolderName(){
    this.orgID = 21;
    this.empkey= 2861;
    // console.log(this.folder$);
    // console.log(this.folder.FormType);
    this.documentService.UpdateDocumentFolderName(this.folder$,this.folder.FormType,this.empkey,this.orgID).subscribe(res => console.log('Done'));
  }

  ngOnInit() {
    debugger;
    this.orgID = 21;
    this.documentService.EditDocFolderName(this.folder$,this.orgID).subscribe((data: any[]) => {
      this.folder = data[0]
    });
  }

}
