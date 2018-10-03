import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }
  getJobtitleView() {
    return this
      .http
      .get('http://localhost:3000/api/addNewJobTitle?empkey=' + 2861 + '&OrganizationID=' + 21);
  }

  getLoginCredentialList(pageNo, itemsPerPage) {
    return this
      .http
      .get('http://localhost:3000/api/getLoginDetailsForAllUsers?pageno=' + pageNo + '&itemsperpage=' + itemsPerPage + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }

  getLoginDetailsByEmpKey(empKey) {
    return this
      .http
      .get('http://localhost:3000/api/getLoginDetailsByID?employeekey=' + empKey + '&OrganizationID=' + 21);

  }

  resetUserPassword(username, password, empKey, userLoginId) {
    return this
      .http
      .get('http://localhost:3000/api/resetPassword?username=' + username + '&password=' + password + '&employeekey=' + empKey + '&updatedBy=' + 2861 + '&userloginid=' + userLoginId + '&OrganizationID=' + 21);

  }

  getUserEmail(username) {
    return this
      .http
      .get('http://localhost:3000/api/getUserEmail?username=' + username + '&empkey=' + 2861 + '&OrganizationID=' + 21);

  }


  getJobTitleList() {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + 6421 + '&OrganizationID=' + 135);

  }

  getallEmployeesList() {
    return this
      .http
      .get('http://localhost:3000/api/allemployees?empkey=' + 6421 + '&OrganizationID=' + 135);

  }

  gettodaysMeeting(today) {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/gettodaysMeeting?ondate=' + today + '&employeekey=' + 6421+ '&pageno=' + 1 + '&itemsPerPage=' + 1000  + '&OrganizationID=' + 135);

  }
}
