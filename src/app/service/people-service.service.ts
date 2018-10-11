import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }

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
  getSupervisorEmployeesList(supervisorKey) {
    return this
      .http
      .get('http://localhost:3000/api/empGetBySupervisor?SupervisorKey=' + supervisorKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }

  getJobtitleEmployeesList(jobTleKey) {
    return this
      .http
      .get('http://localhost:3000/api/empKey_byJobtitle?jobTitle=' + jobTleKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }

  getSupervisorJobtitleEmployeesList(jobTleKey, superVsrKey) {
    return this
      .http
      .get('http://localhost:3000/api/empGetBySupervisorjobTitle?SupervisorKey=' + superVsrKey + '&JobTitleKey=' + jobTleKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }

  addMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1) {

    const uri = "http://localhost:3000/api/addMeetingTraining";
    const obj = {
      actionKey: EventType,
      eventhost: eventHost,
      venue: Venue,
      MeetingNotes: Notes,
      meetingDate: date1,
      startTime: time1,
      endTime: time2,
      empKey: EmployeeKeyString,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }


  getMeetingTrainingDetails(eventKey, actionKey) {
    return this
      .http
      .get('http://localhost:3000/api/getEditViewTrainingMeetingDetails?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + 2861 + '&OrganizationID=' + 21);

  }

  getallEmpsSelected(eventKey, actionKey) {
    return this
      .http
      .get('http://localhost:3000/api/getselectedEmployeeByEventKey?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + 2861 + '&OrganizationID=' + 21);

  }

  updateMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1, EventKey) {

    const uri = "http://localhost:3000/api/updateEditMeetingDetails";
    const obj = {
      actionKey: EventType,
      eventhost: eventHost,
      venue: Venue,
      MeetingNotes: Notes,
      meetingDate: date1,
      startTime: time1,
      endTime: time2,
      empKey: EmployeeKeyString,
      employeekey: 2861,
      OrganizationID: 21,
      // actionTypeKey: EventType,
      eventKey: EventKey

    };
    return this.http.post(uri, obj);
  }

  getEventTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/getAllDefaultEvents?pageno=' + 1 + '&itemsPerPage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  DeleteEventType(actionKey, actionTypeKey) {
    const uri = "http://localhost:3000/api/deleteDefaultEventDetails?ActionKey" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&OrganizationID=" + 21;
    const obj = {};
    return this.http.post(uri, obj);

  }

  getEventTypeDetails(actionKey, actionTypeKey) {
    return this
      .http
      .get('http://localhost:3000/api/getDefaultEventDetailsForEdit?actionKey=' + actionKey + '&actiontypeKey=' + actionTypeKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  UpdateEventType(type, name, desc, actionKey, actionTypeKey) {
    const uri = "http://localhost:3000/api/submitDefaultEventDetails?ActionType=" + type + "&Action=" + name + "&Description=" + desc + "&ActionKey=" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&employeekey=" + 2861 + "&OrganizationID=" + 21;
    const obj = {};
    return this.http.post(uri, obj);

  }
  // ****@Pooja's Code Starts here****

  getUserRoleType() {
    return this
      .http
      .get('http://localhost:3000/api/getAllUserRoleType_Admin?OrganizationID=' + 21);
  }
  getJobTitle() {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  getSuperVisor() {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getDepartment() {
    return this
      .http
      .get('http://localhost:3000/api/department?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  createEmployeebyManager(EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, theCheckbox, JobTitleKey, SupervisorKey, DepartmentKey) {
    debugger;
    const uri = "http://localhost:3000/api/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: UserRoleTypeKey,
      firstname: FirstName,
      lastname: LastName,
      middlename: MiddleName,
      birthDate: BD,
      gender: Gender,
      addressline1: AddressLine1,
      city: City,
      addressline2: AddressLine2,
      state: State,
      country: Country,
      primaryphone: PrimaryPhone,
      zipcode: ZipCode,
      alternatephone: AlternatePhone,
      email: EmailID,
      hireDate: HD,
      isSupervisor: theCheckbox,
      jobTitleKey: JobTitleKey,
      supervisorKey: SupervisorKey,
      departmentKey: DepartmentKey,
      metaupdatedBy: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  getAllEmployeeDetails() {
    return this
      .http
      .get('http://localhost:3000/api/getAllEmployees?pagenumber=' + 1 + '&itemsPerPage=' + 25 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  getAllEmployeeDetailswithjobtitledropdown(seljobtitlevalue) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmpByJobTitle?jobtitleString=' + seljobtitlevalue + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  searchResultOfEmployeedetailsTable(SearchValue) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmployeeOnTable?searchEmployee=' + SearchValue + '&pageno=' + 1 + '&itemsPerPage=' + 25 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  EditEmployeeNumber(EmployeeNum) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + EmployeeNum + '&OrganizationID=' + 21);
  }
  EditEmployeeFirstName(FirstName) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + FirstName + '&OrganizationID=' + 21);
  }
  EditEmployeeLastName(LastName) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + LastName + '&OrganizationID=' + 21);
  }
  EditEmployeeMiddleName(MidName) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + MidName + '&OrganizationID=' + 21);
  }
  EditEmployeeAddLine1(addline1) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + addline1 + '&OrganizationID=' + 21);
  }
  EditEmployeePPhoneNumber(PriPhonenum) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + PriPhonenum + '&OrganizationID=' + 21);
  }
  EditEmployeeEmailID(Email) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + Email + '&OrganizationID=' + 21);
  }
  // EditEmployeeHireDate(HireDate){
  //   return this
  //   .http
  //   .get('http://localhost:3000/api/empDetails?SearchKey='+HireDate+'&OrganizationID='+21);
  // }
  EditEmployeeStatus(EmpStatus) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + EmpStatus + '&OrganizationID=' + 21);
  }
  getEmployeeStatusListforDropdown() {
    return this
      .http
      .get('http://localhost:3000/api/getEmployeeStatus?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getJobTitleListforDropdown() {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  EditEmployeeJobTitle(JobTitle) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + JobTitle + '&OrganizationID=' + 21);
  }
  getDeptListforDropdown() {
    return this
      .http
      .get('http://localhost:3000/api/department?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  EditEmployeeDept(Department) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + Department + '&OrganizationID=' + 21);
  }
  getSupervisorListforDropdown() {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  EditSupervisor(Supervisor) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + Supervisor + '&OrganizationID=' + 21);
  }
  EditEmployeeGender(Gender) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + Gender + '&OrganizationID=' + 21);
  }
  // ****@Pooja's Code Ends here****

  getJobtitleView() {
    return this
      .http
      .get('http://localhost:3000/api/addNewJobTitle?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  searchJobtitle(SearchJobTitle) {
    return this
      .http
      .get('http://localhost:3000/api/searchjobTitle?OrganizationID=' + 21 + '&searchJobTitle=' + SearchJobTitle);
  }
  addJobtitle(jobtitleName, jobTitleDescription) {
    const uri = "http://localhost:3000/api/addJobTitleNew";
    const obj = {
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);

  }
  getEditJobtitleDetails(JobTitleKey) {
    return this
      .http
      .get('http://localhost:3000/api/editviewJobTitle?JobTitleKey=' + JobTitleKey + '&OrganizationID=' + 21);
  }
  updateEditJobtitle(JobTitle_Key, jobtitleName, jobTitleDescription) {

    const uri = "http://localhost:3000/api/updateSelectedJobTitle";
    const obj = {
      JobTitleKey: JobTitle_Key,
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  deleteJobTitle(deleteJobtitleKey) {
    const uri = "http://localhost:3000/api/deleteJobTitleSelected";
    const obj = {
      JobTitleKey: deleteJobtitleKey,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  // createEmployeebyManager(EmployeeNumber,UserRoleTypeKey,FirstName,LastName,MiddleName,BD,Gender,AddressLine1,City,AddressLine2,State,Country,PrimaryPhone,ZipCode,AlternatePhone,EmailID,HD,theCheckbox,JobTitleKey,SupervisorKey,DepartmentKey)
  // {
  //   debugger;
  //   const url = "http://localhost:3000/api/addemp";
  //   const obj = {
  //     employeenumber:EmployeeNumber,
  //     managerkey:UserRoleTypeKey,
  //     firstname:FirstName,
  //     lastname:LastName,
  //     middlename:MiddleName,
  //     birthDate:BD,
  //     gender:Gender,
  //     addressline1:AddressLine1,
  //     city:City,
  //     addressline2:AddressLine2,
  //     state:State,
  //     country:Country,
  //     primaryphone:PrimaryPhone,
  //     zipcode:ZipCode,
  //     alternatephone:AlternatePhone,
  //     email:EmailID,
  //     hireDate:HD,
  //     isSupervisor:theCheckbox,
  //     jobTitleKey:JobTitleKey,
  //     supervisorKey:SupervisorKey,
  //     departmentKey:DepartmentKey,
  //     metaupdatedBy:2861,
  //     OrganizationID:21
  //   };
  //   return this
  //   .http.post(url, obj);
  // }
   // ****@Pooja's Code Ends here****
}
