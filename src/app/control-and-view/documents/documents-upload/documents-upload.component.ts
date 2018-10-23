import { Component, OnInit } from '@angular/core';
import { DocumentserviceService } from '../../../service/documentservice.service';
import { Documents } from '../../../model-class/Documents';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload_test';

@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss']
})

export class DocumentsUploadComponent implements OnInit {

  documentsList:Documents[];
  orgID:number;
  empkey:number;
  FormtypeId:number;
  DescName:any;
  addUrl;
  
  public uploader: FileUploader = new FileUploader({url:'', itemAlias: 'photo'});
  
  constructor(private documentService: DocumentserviceService) { }

  

  ngOnInit() {
    this.empkey=2861;
    this.orgID=21;
    this.documentService
      .getDocumentFolderNamesfordropdown(this.empkey,this.orgID)
      .subscribe((data: Documents[]) => {
        this.documentsList = data;
      });
      
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
  };
  }
  // sub(){
  //   this.addUrl='?formtypeId=' + this.FormtypeId + '&formDesc=' + this.DescName +'&empkey='+this.empkey+'&OrganizationID='+ this.orgID;
  // }
  FileSelected() {
    this.addUrl='?formtypeId=' + this.FormtypeId + '&formDesc=' + this.DescName +'&empkey='+this.empkey+'&OrganizationID='+ this.orgID;
    this.uploader.onBeforeUploadItem = (item) => {
    item.withCredentials = false;
    item.url = URL + this.addUrl;
    
    }
    }
}
