import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CreatebuildingService {

  constructor(private http: HttpClient) { }
  createBuildings(createbuilding, empKey, orgID) {
    const url = 'http://localhost:3000/api/addfacility';
    const obj = {
      fac: createbuilding,
      employeekey: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post (url,obj);
  }
  checkNewBuilding(BuildingName,facility,employeekey,OrganizationID)
  {
    return this
    .http
    .get('http://localhost:3000/api/checkForNewInventory?checkValue='+BuildingName+'&type='+facility+'&employeekey='+employeekey+'&OrganizationID='+OrganizationID);
  }

}
