import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userName, passWord, tenantID) {
    const uri = 'http://localhost:3000/authenticate';
    const obj = {
      uname: userName,
      pwd: passWord,
      tid: tenantID
    };
    return this.http.post(uri, obj);
  }

  getmessage(empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/welcomeUpdateMessage?empKey=` + empkey + '&OrganizationID=' + orgID);
  }

  getUserProfileDetails(empKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/empDetails?SearchKey=` + empKey + '&OrganizationID=' + orgID);
  }
  getUserPasswordDetails(empKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/getLoginDetailsByID?employeekey=` + empKey + '&OrganizationID=' + orgID);
  }

  setPassword(userName, newPassword, Employeekey, UserLoginId, organizationID) {
    const uri = 'http://localhost:3000/api/resetPassword';
    const obj = {
      username: userName,
      password: newPassword,
      employeekey: Employeekey,
      updatedBy: Employeekey,
      userloginid: UserLoginId,
      OrganizationID: organizationID
    };
    return this.http.post(uri, obj);
  }

  getUsermanagerDetails(empKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/getManagerDetailsByID?employeekey=` + empKey + '&OrganizationID=' + orgID);
  }

  getUpdateList(empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/welcomeUpdateMessage?empKey=` + empkey + '&OrganizationID=' + orgID);
  }

  getEmpNameForWelcomeMessage(empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/welcomeMessage?empKey=` + empkey + '&OrganizationID=' + orgID);
  }
}
