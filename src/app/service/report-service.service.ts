import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
=======

>>>>>>> fdcf5bf3b2c1011dccd6d93cdd80f7530c79a2d6
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
<<<<<<< HEAD
  getallsupervisor() {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey='+2861+'&OrganizationID='+21);
  }

=======
   // code by Anju starts
   getBarcodeReport()
   {
     return this
     .http
     .get('http://localhost:3000/api/allfacility?empkey='+2861+'&OrganizationID='+21);
   }

   getEquipmentType()
   {
    return this
    .http
    .get('http://localhost:3000/api/allequiptype?employeekey='+2861+'&OrganizationID='+21);
   }

   getEquipment()
   {
    return this
    .http
    .get('http://localhost:3000/api/getallEquipments?employeekey='+2861+'&OrganizationID='+21);
   }

   getFloor(FacilityKey)
   {
    return this
    .http
    .get('http://localhost:3000/api/domainvaluesByKey?domain=facilityOnly&key='+FacilityKey+'&OrganizationID='+21);
   }

   //code by Anju Ends
>>>>>>> fdcf5bf3b2c1011dccd6d93cdd80f7530c79a2d6
}
