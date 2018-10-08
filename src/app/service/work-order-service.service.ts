import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WorkOrderServiceService {

  constructor(private http: HttpClient) {}
    getallEmployee(emp_key,org_id)
    {
      return this
      .http
      .get('http://localhost:3000/api/employeeForManager?empkey='+emp_key+'&OrganizationID='+org_id);
    }
    getallFacility(emp_key,org_id)
    {
      return this
      .http
      .get('http://localhost:3000/api/allfacility?empkey='+emp_key+'&OrganizationID='+org_id);
    }
    getallPriority(org_id)
    {
      
      return this
      .http
      .get('http://localhost:3000/api/allpriority?OrganizationID='+org_id);
    }
   
}
