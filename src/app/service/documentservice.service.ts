import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentserviceService {

  constructor(private http: HttpClient) { }

  getDocumentFoldersDataTable(empkey,orgid){
    return this
    .http
    .get('http://localhost:3000/api/getFormDetails?pageno='+1+'&itemsPerPage='+25+'&empkey='+empkey+'&OrganizationID='+orgid);
  }
  SearchDocFolder(orgid,SearchValue){
    return this
    .http
    .get('http://localhost:3000/api/searchFormList?OrganizationID='+orgid+'&searchForm='+SearchValue);
  }
  CreateNewDocumentFolder(DocFolderName,servempkey,orgid){
    const url = 'http://localhost:3000/api/addNewForms';
    const obj = {
      newform: DocFolderName,
      serverEmpKey: servempkey,
      OrganizationID: orgid
    };
    return this
      .http
      .post(url, obj);
    
    // return this
    // .http
    // .get('http://localhost:3000/api/addNewForms?newform='+DocFolderName+'&serverEmpKey='+servempkey+'&OrganizationID='+orgid);
  }
  EditDocFolderName(Docfoldername,orgid){
    debugger;
    return this
    .http
    .get('http://localhost:3000/api/getEditFormDetails?FormtypeId='+Docfoldername+'&OrganizationID='+orgid);
  }
  UpdateDocumentFolderName(formtypeid,formtype,empkey,orgid){
    const url = 'http://localhost:3000/api/updateFormDetails';
    const obj = {
      FormtypeId: formtypeid,
      FormType: formtype,
      empkey:empkey,
      OrganizationID: orgid
    };
    return this
      .http
      .post(url, obj);
  }
}
