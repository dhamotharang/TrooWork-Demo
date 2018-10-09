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
    //    debugger;
    return this.http.post(uri, obj);
  }

  getmessage() {
    return this
      .http
      .get(`http://localhost:3000/api/welcomeUpdateMessage?empKey=` + 2861 + '&OrganizationID=' + 21);
  }

  getUserProfileDetails(empKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/empDetails?SearchKey=` + empKey + '&OrganizationID=' + orgID);
  }
}
