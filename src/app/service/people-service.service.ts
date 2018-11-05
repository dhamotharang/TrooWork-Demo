import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }

  getLoginCredentialList(pageNo, itemsPerPage, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getLoginDetailsForAllUsers?pageno=' + pageNo + '&itemsperpage=' + itemsPerPage + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getLoginDetailsByEmpKey(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getLoginDetailsByID?employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  resetUserPassword(username, password, empKey, userLoginId, updatedUser, OrgID) {
    const uri = "http://localhost:3000/api/resetPassword";
    const obj = {
      username: username,
      password: password,
      employeekey: empKey,
      updatedBy: updatedUser,
      userloginid: userLoginId,
      OrganizationID: OrgID
    };
    
      return this.http.post(uri, obj);
  }

  getUserEmail(username, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getUserEmail?username=' + username + '&empkey=' + empKey + '&OrganizationID=' + OrgID);

  }


  getJobTitleList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getallEmployeesList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/allemployees?empkey=' + empKey + '&OrganizationID=' + OrgID);

  }

  gettodaysMeeting(today, empKey, OrgID) {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/gettodaysMeeting?ondate=' + today + '&employeekey=' + empKey + '&pageno=' + 1 + '&itemsPerPage=' + 1000 + '&OrganizationID=' + OrgID);

  }

  viewMtngTrainingbyFilter(fromDate, toDate, JobList, EmpList, empKey, OrgID) {

    const uri = "http://localhost:3000/api/viewMeettingTrainingByAllFilter";
    const obj = {
      empKey: empKey,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  SearchmeetingTraining(fromDate, toDate, JobList, EmpList, SearchValue, empKey, OrgID) {

    const uri = "http://localhost:3000/api/searchMeetingEventView";
    const obj = {
      empKey: empKey,
      search_DT: fromDate,
      search_DT2: toDate,
      employees: EmpList,
      jobs: JobList,
      searchMeeting: SearchValue,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  viewEmployeesOfEvent(eventKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewEmployeesOfEvent?EventKey=' + eventKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  markAttendance(empKey, eventKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/submitMarkAsAttendedTraining?EventKey=' + eventKey + '&attendedEmployees=' + empKey + '&OrganizationID=' + OrgID);

  }


  removeAttendance(empKey, eventKey, OrgID) {

    const uri = "http://localhost:3000/api/unAttendedTrainingChangeStatus?EventKey=" + eventKey + "&employeekey=" + empKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(uri, obj);
  }


  DeleteMeetingTraining(eventKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/deleteMeetingViewEmployeeDetails?EventKey=' + eventKey + '&OrganizationID=' + OrgID);

  }


  getSupervisorList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }
  getallEventList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/meetingTraining?empKey=' + empKey + '&OrganizationID=' + OrgID);

  }
  getSupervisorEmployeesList(supervisorKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/empGetBySupervisor?SupervisorKey=' + supervisorKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getJobtitleEmployeesList(jobTleKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/empKey_byJobtitle?jobTitle=' + jobTleKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getSupervisorJobtitleEmployeesList(jobTleKey, superVsrKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/empGetBySupervisorjobTitle?SupervisorKey=' + superVsrKey + '&JobTitleKey=' + jobTleKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }

  addMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1, empKey, OrgID) {

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
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  getMeetingTrainingDetails(eventKey, actionKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getEditViewTrainingMeetingDetails?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + empKey + '&OrganizationID=' + OrgID);

  }

  getallEmpsSelected(eventKey, actionKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getselectedEmployeeByEventKey?EventKey=' + eventKey + '&ActionKey=' + actionKey + '&EmployeeKey=' + empKey + '&OrganizationID=' + OrgID);

  }

  updateMeetingTraining(EventType, eventHost, Venue, time1, time2, Notes, EmployeeKeyString, date1, EventKey, empKey, OrgID) {

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
      employeekey: empKey,
      OrganizationID: OrgID,
      // actionTypeKey: EventType,
      eventKey: EventKey

    };
    return this.http.post(uri, obj);
  }

  getEventTypeList(page, itemsPerPage, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllDefaultEvents?pageno=' + page + '&itemsPerPage=' + itemsPerPage + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  DeleteEventType(actionKey, actionTypeKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteDefaultEventDetails?ActionKey" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(uri, obj);

  }

  getEventTypeDetails(actionKey, actionTypeKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getDefaultEventDetailsForEdit?actionKey=' + actionKey + '&actiontypeKey=' + actionTypeKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  UpdateEventType(type, name, desc, actionKey, actionTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/submitDefaultEventDetails?ActionType=" + type + "&Action=" + name + "&Description=" + desc + "&ActionKey=" + actionKey + "&ActionTypeKey=" + actionTypeKey + "&employeekey=" + empKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(uri, obj);

  }
  // ****@Pooja's Code Starts here****

  getUserRoleType(OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllUserRoleType_Admin?OrganizationID=' + OrgID);
  }
  getJobTitle(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getSuperVisor(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getDepartment(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/department?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  createEmployeebyManager(EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, theCheckbox, JobTitleKey, SupervisorKey, DepartmentKey, empKey, OrgID) {
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
      metaupdatedBy: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }
  getAllEmployeeDetails(pagenumber, itemsPerPage, empkey, org) {
    return this
      .http
      .get('http://localhost:3000/api/getAllEmployees?pagenumber=' + pagenumber + '&itemsPerPage=' + itemsPerPage + '&empkey=' + empkey + '&OrganizationID=' + org);
  }
  getAllEmployeeDetailswithjobtitledropdown(seljobtitlevalue, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmpByJobTitle?jobtitleString=' + seljobtitlevalue + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  searchResultOfEmployeedetailsTable(SearchValue, pageno, itemsPerPage, employeekey, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmployeeOnTable?searchEmployee=' + SearchValue + '&pageno=' + pageno + '&itemsPerPage=' + itemsPerPage + '&employeekey=' + employeekey + '&OrganizationID=' + OrganizationID);
  }
  UpdateEmployeeDetailsbyManager(mankey, empk, orgid, EmployeeNumber, userRoleTypeKey, FirstName, LastName, MiddleName, BirthDate, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, HireDate, IsSupervisor, SupervisorKey, JobTitleKey, DepartmentKey) {
    const uri = "http://localhost:3000/api/update_employee_info";
    const obj = {
      EmployeeKey: empk,
      managerKey: mankey,
      EmployeeNumber: EmployeeNumber,
      FirstName: FirstName,
      LastName: LastName,
      MiddleName: MiddleName,
      JobTitleKey: JobTitleKey,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: City,
      State: State,
      ZipCode: ZipCode,
      Country: Country,
      PrimaryPhone: PrimaryPhone,
      AlternatePhone: AlternatePhone,
      birthDate: BirthDate,
      hireDate: HireDate,
      IsSupervisor: IsSupervisor,
      SupervisorKey: SupervisorKey,
      DepartmentKey: DepartmentKey,
      EmailID: EmailID,
      OrganizationID: orgid,
      Gender: Gender,
      UserRoleTypeKey: userRoleTypeKey,
      EmployeeStatusKey1: EmployeeStatusKey
    };
    return this.http.post(uri, obj);


  }
  getEmployeeStatusListforDropdown(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getEmployeeStatus?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getJobTitleListforDropdown(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/selectJobtitle?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getDeptListforDropdown(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/department?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getSupervisorListforDropdown(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  EditEmployeeDetailsbyManager(empk, orgid) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + empk + '&OrganizationID=' + orgid);
  }
  // ****@Pooja's Code Ends here****

  getJobtitleView(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/addNewJobTitle?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  searchJobtitle(SearchJobTitle, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchjobTitle?OrganizationID=' + OrgID + '&searchJobTitle=' + SearchJobTitle);
  }
  addJobtitle(jobtitleName, jobTitleDescription, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addJobTitleNew";
    const obj = {
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);

  }
  getEditJobtitleDetails(JobTitleKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/editviewJobTitle?JobTitleKey=' + JobTitleKey + '&OrganizationID=' + OrgID);
  }
  // ****@Pooja's Code Starts here****
  createEmployeebySuperAdmin(OrgID,  ManagerKey,EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, theCheckbox, JobTitleKey, DepartmentKey, empKey) {
    const url = "http://localhost:3000/api/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: ManagerKey,
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
      departmentKey: DepartmentKey,
      metaupdatedBy: empKey,
      OrganizationID: OrgID
    };
    return this
      .http.post(url, obj);
  }
  getOrganization(OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllOrganization?OrganizationID=' + OrgID);
  }
  getUserRoleTypesa(OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllUserRoleType_SuperAdmin?OrganizationID=' + OrgID);
  }
  getAllEmployeeDetailswithjobtitledropdownsa(orgid, empkey, jobtikey, mankey) {
    const url = "http://localhost:3000/api/employeeByAllFilter";
    const obj = {
      JobTitleKey: jobtikey,
      ManagerKey: mankey,
      employeekey: empkey,
      OrganizationID: orgid,
      pagenumber: 1,
      itemsPerPage: 25
    };
    return this
      .http.post(url, obj);
  }
  getvaluesForManagerDropdowninSA(empkey, orgid) {
    return this
      .http
      .get('http://localhost:3000/api/getManagerForEmployee?employeekey=' + empkey + '&OrganizationID=' + orgid);
  }
  DeleteEmployeeDetailsbyManager(delete_EmpKey, orgID, updatedby) {
    const url = "http://localhost:3000/api/removeEmployee";
    const obj = {
      empKey: delete_EmpKey,
      updatedBy: updatedby,
      OrganizationID: orgID
    };
    return this
      .http.post(url, obj);
  }
  getOrganizationDDforSuprAdmin(orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllOrganization?OrganizationID=' + orgID);
  }
  EditEmployeeDetailsbySuperadmin(empk, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/empDetails?SearchKey=' + empk + '&OrganizationID=' + orgID);
  }
  getDepartmentforddinSuperadmin(emplokey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/department?empkey=' + emplokey + '&OrganizationID=' + orgID);
  }
  getEmployeeStatusListforDropdowninSuperadmin(emplokey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getEmployeeStatus?employeekey=' + emplokey + '&OrganizationID=' + orgID);
  }
  getjobTitleforDropdowninSuperadmin(orgID) {
    return this
      .http
      .get('http://localhost:3000/api/JobtitleForSuperAdmin?OrganizationID=' + orgID);
  }
  UpdateEmployeeDetailsbySa(managerKey, empk, orgID, UserRoleTypeKey, EmployeeNumber, FirstName, LastName, MiddleName, birthdt, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, JobTitleKey, DepartmentKey, Gender) {
    const uri = "http://localhost:3000/api/update_employee_info";
    const obj = {
      EmployeeKey: empk,
      managerKey: managerKey,
      EmployeeNumber: EmployeeNumber,
      FirstName: FirstName,
      LastName: LastName,
      MiddleName: MiddleName,
      JobTitleKey: JobTitleKey,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: City,
      State: State,
      ZipCode: ZipCode,
      Country: Country,
      PrimaryPhone: PrimaryPhone,
      AlternatePhone: AlternatePhone,
      birthDate: birthdt,
      hireDate: hiredt,
      IsSupervisor: IsSupervisor,
      DepartmentKey: DepartmentKey,
      EmailID: EmailID,
      OrganizationID: orgID,
      UserRoleTypeKey: UserRoleTypeKey,
      EmployeeStatusKey1: EmployeeStatusKey,
      Gender: Gender
    };
    return this.http.post(uri, obj);
  }
  DeleteEmployeeDetailsbySuperadmin(delete_EmpKey, orgID, Updatdby) {
    const url = "http://localhost:3000/api/removeEmployee";
    const obj = {
      empKey: delete_EmpKey,
      updatedBy: Updatdby,
      OrganizationID: orgID
    };
    return this
      .http.post(url, obj);
  }
  getMeetingTrainingViewforemployee(page, count, curr_date, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/gettodaysMeeting?ondate=' + curr_date + '&employeekey=' + empKey + '&pageno=' + page + '&itemsPerPage=' + count + '&OrganizationID=' + orgID);
  }

  SearchMeetingviewforemployee(SearchValue, empKey, orgID, curr_date) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmpMeetingORTraining?OrganizationID=' + orgID + '&searchActionType=' + SearchValue + '&toServeremployeekey=' + empKey + '&today_DT=' + curr_date);
  }
  getuserNamePasswordforsaveandSendemail(page, count, empKey, orgid) {
    return this
      .http
      .get('http://localhost:3000/api/getLoginDetailsForAllUsers?pageno=' + page + '&itemsperpage=' + count + '&employeekey=' + empKey + '&OrganizationID=' + orgid);
  }
  // ****@Pooja's Code Ends here****
  updateEditJobtitle(JobTitle_Key, jobtitleName, jobTitleDescription, empKey, OrgID) {

    const uri = "http://localhost:3000/api/updateSelectedJobTitle";
    const obj = {
      JobTitleKey: JobTitle_Key,
      JobTitle: jobtitleName,
      JobTitleDescription: jobTitleDescription,
      empkey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }
  deleteJobTitle(deleteJobtitleKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteJobTitleSelected";
    const obj = {
      JobTitleKey: deleteJobtitleKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  searchLoginCredsList(key, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchEmployeeList?searchEmployee=' + key + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getmanagersForEmp(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getManagerForEmployee?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  createEmployeebyAdmin(EmployeeNumber, ManagerKey, FirstName, LastName, MiddleName, BD, Gender,
    AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, HD, issupervisor,
    JobTitleKey, DepartmentKey, employeekey, OrganizationID) {
    const uri = "http://localhost:3000/api/addemp";
    const obj = {
      employeenumber: EmployeeNumber,
      managerkey: ManagerKey,
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
      isSupervisor: issupervisor,
      jobTitleKey: JobTitleKey,
      departmentKey: DepartmentKey,
      metaupdatedBy: employeekey,
      OrganizationID: OrganizationID
    };
    return this.http.post(uri, obj);
  }

  checkEmpNumber(empNumber, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkforEmployeeNumber?Employeenumber=' + empNumber + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  checkUserName(userName, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkUsername?username=' + userName + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  setLoginCreds(userName, passWord, empKey, employeekey, uRoleTypeKey, OrgID) {
    const uri = "http://localhost:3000/api/setUsernamePassword";
    const obj = {
      username: userName,
      password: passWord,
      employeekey: empKey,
      updatedBy: employeekey,
      userRoleTypeKey: uRoleTypeKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getEmployeeByFilters(jobtKey, managerKey, empKey, orgID) {
    const uri = "http://localhost:3000/api/employeeByAllFilter";
    const obj = {
      JobTitleKey: jobtKey,
      ManagerKey: managerKey,
      employeekey: empKey,
      pagenumber: 1,
      itemsPerPage: 25,
      OrganizationID: orgID
    };
    return this.http.post(uri, obj);
  }
  JobtitleForSuperAdmin(OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/JobtitleForSuperAdmin?OrganizationID=' + OrganizationID);

  }
  addMeetinTraingByNewEvent(obj){
    const uri = "http://localhost:3000/api/addMeetinTraingByNewEvent";
    return this.http.post(uri, obj);
  }
}
