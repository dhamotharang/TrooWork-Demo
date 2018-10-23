import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private http: HttpClient) { }

  getAllSchedulingNames(empkey, orgID) {
    debugger;
    return this
      .http
      .get(`http://localhost:3000/api/getBatchScheduleName?empkey=` + empkey + '&OrganizationID=' + orgID);
  }

  getSchedulingDetails(scheduleKey, empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/getBatchScheduleMasterDetailService?batchschedulenamekey=` + scheduleKey + '&employeekey=' + empkey + '&OrganizationID=' + orgID);
  }

  getRoomDetailsForSchedule(scheduleKey, empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/roomsForCreateBatchSchedule?BatchScheduleNameKey=` + scheduleKey + '&employeekey=' + empkey + '&OrganizationID=' + orgID);
  }

  getRoomofTempTableDetailsForSchedule(scheduleKey, empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/roomstempForCreateBatchSchedule?BatchScheduleNameKey=` + scheduleKey + '&employeekey=' + empkey + '&OrganizationID=' + orgID);
  }

  getAllWorkOrders(empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/allWorkordertype?empkey=` + empkey + '&OrganizationID=' + orgID);
  }

  setUpdateScheduleReport(scheduleUpdate) {

    const uri = "http://localhost:3000/api/updateScheduleReport";
    return this.http.post(uri, scheduleUpdate);
  }

  setInsertScheduleReport(scheduleInsert) {

    const uri = "http://localhost:3000/api/saveScheduleReport";
    return this.http.post(uri, scheduleInsert);
  }

  getAllBatchScheduleNames(page, itemsPerPage, empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/viewScheduleNameList?pageno=` + page + '&itemsPerPage=' + itemsPerPage + '&managerkey=' + empkey + '&OrganizationID=' + orgID);
  }

  searchBatchScheduleName(SearchValue, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/searchScheduleName?searchSchedule=` + SearchValue + '&OrganizationID=' + orgID);
  }

  getAllEmpList(empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/employeeForManager?empkey=` + empkey + '&OrganizationID=' + orgID);
  }

  checkScheduleName(scheduleName, empkey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/checkForNewScheduleName?bkey=` + scheduleName + '&employeekey=' + empkey + '&OrganizationID=' + orgID);
  }

  addScheduleName(scheduleName, empKey, scheduleDescription, EMPloyeeKey, OrgID) {

    const uri = "http://localhost:3000/api/addnewbatchName";
    const obj = {
      BatchSchduleName: scheduleName,
      ScheduleDescription: scheduleDescription,
      EmployeeKey: empKey,
      employeekey: EMPloyeeKey,
      OrganizationID: OrgID
    }
    return this.http.post(uri, obj);
  }

  getSchedulingRoomList(scheduleKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/getscheduledroomsbybatchschedulename?batchschedulenamekey=` + scheduleKey + '&OrganizationID=' + orgID);
  }

  getAllOtherRoomList(scheduleKey, orgID, pageno, itemsPerPage) {
    return this
      .http
      .get(`http://localhost:3000/api/getScheduleRoomslistByBatchScheduleNamekey?batchschedulenamekey=` + scheduleKey + '&OrganizationID=' + orgID + '&pageno=' + pageno + '&itemsperpage=' + itemsPerPage);
  }


  addRoomToSchedule(BatchScheduleNameKey, addRoomString, employeekey, OrgID) {

    const uri = "http://localhost:3000/api/addRoomInWorkOrder";
    const obj = {
      empkey: employeekey,
      wkey: BatchScheduleNameKey,
      rkey: addRoomString,
      OrganizationID: OrgID
    }
    return this.http.post(uri, obj);
  }

  getScheduleDetailsbyID(scheduleKey, orgID) {
    return this
      .http
      .get(`http://localhost:3000/api/getScheduleById?bkey=` + scheduleKey + '&OrganizationID=' + orgID);
  }

  assignChangesForWO(employeekey, orgID, EmpKey, scheduleNameKey, ScheduleDescription) {
    return this
      .http
      .get(`http://localhost:3000/api/assignChangesForWork?managerkey=` + employeekey + '&empkey=' + EmpKey + '&batchkey=' + scheduleNameKey + '&batchdesp=' + ScheduleDescription + '&OrganizationID=' + orgID);
  }

  checkForNewScheduleName(EmpKey, orgID, BatchSchduleName) {
    return this
      .http
      .get(`http://localhost:3000/api/checkForNewScheduleName?bkey=` + BatchSchduleName + '&employeekey=' + EmpKey + '&OrganizationID=' + orgID);
  }

  updateScheduleNameDetails(employeeKey, OrgID, BatchscheduleName, empKey, scheduleNameKey, ScheduleDescription) {

    const uri = "http://localhost:3000/api/updateScheduleName";
    const obj = {
      BatchSchduleName: BatchscheduleName,
      ScheduleDescription: ScheduleDescription,
      EmployeeKey: empKey,
      bskey: scheduleNameKey,
      employeekey: employeeKey,
      OrganizationID: OrgID
    }
    return this.http.post(uri, obj);
  }
}
