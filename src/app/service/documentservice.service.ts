import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class DocumentserviceService {

  constructor(private http: HttpClient) { }

  getDocumentFoldersDataTable(page,itemsCount,empKey,orgid){
    return this
    .http
    .get('http://localhost:3000/api/getFormDetails?pageno='+page+'&itemsPerPage='+itemsCount+'&empkey='+empKey+'&OrganizationID='+orgid);
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
  }
  EditDocFolderName(Docfoldername,orgid){
    return this
    .http
    .get('http://localhost:3000/api/getEditFormDetails?FormtypeId='+Docfoldername+'&OrganizationID='+orgid);
  }
  UpdateDocumentFolderName(formtypeid,formtype,empKey,orgid){
    const url = 'http://localhost:3000/api/updateFormDetails';
    const obj = {
      FormtypeId: formtypeid,
      FormType: formtype,
      empkey:empKey,
      OrganizationID: orgid
    };
    return this
      .http
      .post(url, obj);
  }    
  DeleteDocFolder(deldfkey,orgID){
    const url = 'http://localhost:3000/api/deleteForm';
    const obj = {
      FormtypeId: deldfkey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  getDocumentFolderNamesfordropdown(empKey,orgID)
  {
    return this
    .http
    .get('http://localhost:3000/api/allFormtype?empkey='+empKey+'&OrganizationID='+orgID);
  }
  getRecentUploads(empKey,orgID)
  {
    return this
    .http
    .get('http://localhost:3000/api/view_uploads?pageno='+1+'&itemsPerPage='+25+'&empkey='+empKey+'&OrganizationID='+orgID);
  }
  SearchFileNameandDescName(orgID,SearchValue){
    return this
    .http
    .get('http://localhost:3000/api/searchViewFormList?OrganizationID='+orgID+'&searchForm='+SearchValue);
  }
  getFileDetailsTablewithDropdown(formtype,empKey,orgID){
    return this
    .http
    .get('http://localhost:3000/api/uploadsByFormType?formType='+formtype+'&empkey='+empKey+'&OrganizationID='+orgID);
  }
//   downloadFile(id): Observable<Blob> {
//     let options = new RequestOptions({responseType: ResponseContentType.Blob });
//     return this.http.get(this._baseUrl + '/' + id, options)
//         .map(res => res.blob())
//         .catch(this.handleError)
// }
}
