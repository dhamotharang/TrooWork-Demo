import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
  getallsupervisor() {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey='+2861+'&OrganizationID='+21);
  }

}
