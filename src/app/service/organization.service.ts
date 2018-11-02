import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  createOrganization(OrgName, OrgDesc, Location, State, Country, updatedby, TenName, OrgEmail, tenID) {
    const url = 'http://localhost:3000/api/organizationAdd';
    const obj = {
      OrganizationName: OrgName,
      OrganizationDescription: OrgDesc,
      Location: Location,
      State: State,
      Country: Country,
      MetaUpdatedBy: updatedby,
      TenantName: TenName,
      OrganizationEmail: OrgEmail,
      TenantID: tenID
    };
    return this
      .http
      .post(url, obj);
  }
  getOrganization(page, itemCount) {
    return this
      .http
      .get('http://localhost:3000/api/getOrganizationDetails?itemsPerPage=' + itemCount + '&pageNumber=' + page);
  }
  DeleteOrganization(orgkey, updatedby) {
    const url = 'http://localhost:3000/api/deleteOrganizationDetailsByID';
    const obj = {
      OrganizationID: orgkey,
      metaUpdatedBy: updatedby
    };
    return this
      .http
      .post(url, obj);
  }
  ViewOrgDetailsforedit(OrgId) {
    return this
      .http
      .get('http://localhost:3000/api/getOrganizationDetailsByID?OrganizationID=' + OrgId);
  }
  UpdateOrganizationDetails(OName, ODesc, state, tid, loc, country, tename, email, updatedby, orgid) {
    const url = 'http://localhost:3000/api/updateOrganizationDetailsByID';
    const obj = {
      OrganizationName: OName,
      OrganizationDescription: ODesc,
      Location: loc,
      State: state,
      Country: country,
      MetaUpdatedBy: updatedby,
      OrganizationID: orgid,
      TenantName: tename,
      OrganizationEmail: email,
      TenantID: tid
    };
    return this
      .http
      .post(url, obj);

  }
  checkForTenantId(TenantID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForTenantId?TenantID=' + TenantID);
  }
}
