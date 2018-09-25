import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }
  getTemplateName() {
    return this
      .http
      .get('http://localhost:3000/api/getTemplates?employeekey='+2861+'&OrganizationID='+21);
  }
}
