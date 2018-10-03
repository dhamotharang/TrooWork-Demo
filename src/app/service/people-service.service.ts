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
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + 2861 + '&OrganizationID=' + 21);

  }

  getallEmployeesList() {
    return this
      .http
      .get('http://localhost:3000/api/allemployees?empkey=' + 2861 + '&OrganizationID=' + 21);

  }

  gettodaysMeeting(today) {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/gettodaysMeeting?ondate=' + today + '&employeekey=' + 2861 + '&pageno=' + 1 + '&itemsPerPage=' + 1000 + '&OrganizationID=' + 21);

  }

  viewMtngTrainingbyFilter(fromDate, toDate, JobList, EmpList) {

    const uri = "http://localhost:3000/api/viewMeettingTrainingByAllFilter";
    const obj = {
      empKey: 2861,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }


  SearchmeetingTraining(fromDate, toDate, JobList, EmpList, SearchValue) {

    const uri = "http://localhost:3000/api/searchMeetingEventView";
    const obj = {
      empKey: 2861,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      searchMeeting: SearchValue,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  viewEmployeesOfEvent(eventKey) {
    return this
      .http
      .get('http://localhost:3000/api/viewEmployeesOfEvent?EventKey=' + eventKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }

  markAttendance(empKey, eventKey) {
    return this
      .http
      .get('http://localhost:3000/api/submitMarkAsAttendedTraining?EventKey=' + eventKey + '&attendedEmployees=' + empKey + '&OrganizationID=' + 21);

  }


  removeAttendance(empKey, eventKey) {

    const uri = "http://localhost:3000/api/unAttendedTrainingChangeStatus?EventKey=" + eventKey + "&employeekey=" + empKey + "&OrganizationID=" + 21;
    const obj = {};
    return this.http.post(uri, obj);
  }


  DeleteMeetingTraining(eventKey) {
    return this
      .http
      .get('http://localhost:3000/api/deleteMeetingViewEmployeeDetails?EventKey=' + eventKey + '&OrganizationID=' + 21);

  }


  getSupervisorList() {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + 2861 + '&OrganizationID=' + 21);

  }
  getallEventList() {
    return this
      .http
      .get('http://localhost:3000/api/meetingTraining?empKey=' + 2861 + '&OrganizationID=' + 21);

  }

}
