import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }
  getTemplateName(empkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplates?employeekey=' + empkey + '&OrganizationID=' + orgID);
  }
  getAuditorName(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getEmployeeName(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allemployees?empkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getBuildingName(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allfacility?empkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getallFloorNames(key, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/domainvaluesByKey?domain=facilityOnly' + '&key=' + key + '&OrganizationID=' + orgID);
  }
  getallZones(fkey, flkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/zoneByFacility_Floor?fkey=' + fkey + '&floorkey=' + flkey + '&OrganizationID=' + orgID);
  }
  getallRooms(fkey, flkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/roomByFacility_Floor?fkey=' + fkey + '&floorkey=' + flkey + '&OrganizationID=' + orgID);
  }
  getallRoomType(fkey, flkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/roomtypeByFacility_Floor?fkey=' + fkey + '&floorkey=' + flkey + '&OrganizationID=' + orgID);
  }
  getScoreTypeList(orgID) {
    return this
      .http
      .get('http://localhost:3000/api/scoringtype?OrganizationID=' + orgID);
  }
  createInspectionTemplate(ScoreTypeKey, InspTempName, QustArry, empKey, orgID) {
    const url = 'http://localhost:3000/api/addTemplatequestion';
    const obj = {
      scoringTypeKey: ScoreTypeKey,
      question: QustArry,
      templatename: InspTempName,
      employeekey: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  createInspections(TemplateID, SupervisorKey, fromdate, todate, theCheckbox, time, RoomKey, employee, empKey, orgID) {
    const url = 'http://localhost:3000/api/addInspectionOrderwithRecurring';
    const obj = {
      templateID: TemplateID,
      supervisorKey: SupervisorKey,
      inspectionFromDate: fromdate,
      inspectionToDate: todate,
      isRecurring: theCheckbox,
      inspectiontime: time,
      roomKey: RoomKey,
      OrganizationID: orgID,
      empkey: employee,
      metaUpdatedBy: empKey,
      fulltime: fromdate + " " + time
    };
    return this
      .http
      .post(url, obj);
  }
  getTemplateNameList(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getTempDetailsForDropdown?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getInspectionTemplateTable(key, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplateFilterByTemplateID?key=' + key + '&OrganizationID=' + orgID);
  }
  DeleteInspectionTemplate(templateID, templateQuestionID, empKey, orgID) {
    const url = 'http://localhost:3000/api/deleteInspectionTemplateQuestions';
    const obj = {
      templateID: templateID,
      templateQuestionID: templateQuestionID,
      updatedBy: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  getInspectionTemplateDetails(page, itemsCount, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplateDetails?pageno=' + page + '&itemsPerPage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + orgID);

  }
  getInspectionOrderTablewithFromCurrentDateFilter(curr_date, page, itemsCount, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewInspection?pageno=' + page + '&itemsPerPage=' + itemsCount + '&inspectionDate=' + curr_date + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getInspectionOrderTablewithFromDateandToDateFilter(date1, date2, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewAllInspectionByDates?search_DT=' + date1 + '&search_DT2=' + date2 + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getInspectionOrderTablewithFromDateOnly(date1, page, itemsCount, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewInspection?pageno=' + page + '&itemsPerPage=' + itemsCount + '&inspectionDate=' + date1 + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  DeleteTemplate(templateID, empKey, orgID) {
    const url = 'http://localhost:3000/api/deleteInspectionTemplate';
    const obj = {
      templateID: templateID,
      updatedBy: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  SearchTemplate(searchMytemp, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchMytemplate?OrganizationID=' + orgID + '&searchMytemp=' + searchMytemp)
  }
  SearchTempNameandQuestion(searchMytemp, TemplateID, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchtemplateQun?OrganizationID=' + orgID + '&searchMytemp=' + searchMytemp + '&TemplateID=' + TemplateID)
  }
  SearchTemplateandLocation(SearchValue, search_DT, search_DT2, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchInspectionOrder?OrganizationID=' + orgID + '&searchLocation=' + SearchValue + '&search_DT=' + search_DT + '&search_DT2=' + search_DT2)
  }
  getViewInspectionManager(ioKey, OrgId) {
    return this
      .http
      .get('http://localhost:3000/api/getinspectionDetails?inspectionorder=' + ioKey + '&OrganizationID=' + OrgId)
  }
  InspectionDetails(Insp_Key, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getInspectionorder?InspectionorderKey=' + Insp_Key + "&OrganizationID=" + orgID);
  }
  templateQuestionService(templateId, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplateQuestions?templateId=' + templateId + "&OrganizationID=" + orgID);
  }
  InspectionSaveService(inspectionDetail) {
    const url = 'http://localhost:3000/api/saveinspectedQuestions';

    return this
      .http
      .post(url, inspectionDetail).subscribe(res => console.log('Done'));
  }
  inspectionCompletedService(inspectionDetail1) {
    const url = 'http://localhost:3000/api/inspectionCompleted';

    return this
      .http
      .post(url, inspectionDetail1);
  }
  updateEditedTemplateQuestion(obj) {
    const url = 'http://localhost:3000/api/updateEditedTemplateQuestion';
    return this
      .http
      .post(url, obj);
  }
  insertEditedTemplateQuestion(obj) {
    const url = 'http://localhost:3000/api/insertEditedTemplateQuestion';
    return this
      .http
      .post(url, obj);
  }
  updateTemplateDetails(templatename, tempEditid, OrganizationID, ScoreTypeKey) {
    return this
      .http
      .get('http://localhost:3000/api/updateTemplateDetails?templatename=' + templatename + '&tempEditid=' + tempEditid + '&OrganizationID=' + OrganizationID + '&ScoreTypeKey=' + ScoreTypeKey);

  }
  getTemplateQuestionsEditDetails(templateid, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplateQuestionsEditDetails?templateid=' + templateid + '&OrganizationID=' + OrganizationID);

  }
  deleteSelectedTemplateQuestion(templateID, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/deleteSelectedTemplateQuestion?templateID=' + templateID + '&OrganizationID=' + OrganizationID);

  }
  getTemplateEditDetails(templateid, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/getTemplateEditDetails?templateid=' + templateid + '&OrganizationID=' + OrganizationID);
  }
  scoringtype(OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/scoringtype?OrganizationID=' + OrganizationID);

  }
  checkforInspectionOnTemplate(templateid, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/checkforInspectionOnTemplate?templateid=' + templateid + '&OrganizationID=' + OrganizationID);
  }
  updateEditInspection(TemplateName, TemplateID, ScoreTypeKey, OrganizationID) {
    return this
      .http
      .get('http://localhost:3000/api/updateEditInspection?TemplateName=' + TemplateName + '&TemplateID=' + TemplateID + '&ScoreTypeKey=' + ScoreTypeKey + '&OrganizationID=' + OrganizationID);

  }
  SearchTemplateandLocationbysuprvsr(SearchValue, orgid, toservempkey, newdate) {
    return this
      .http
      .get('http://localhost:3000/api/searchinspection?searchWO=' + SearchValue + '&OrganizationID=' + orgid + '&toServeremployeekey=' + toservempkey + '&today_DT=' + newdate);

  }
  getInspectionOrderTablewithCurrentDatefrsprvsr(curr_date, toservempkey, orgid) {
    return this
      .http
      .get('http://localhost:3000/api/getSupervisorInspectionView?to_date=' + curr_date + '&employeekey=' + toservempkey + '&OrganizationID=' + orgid);

  }
  checkforTemplate(InspTempName,OrganizationID){
    return this
    .http
    .get('http://localhost:3000/api/checkForTemplate?templateName='+InspTempName+'&OrganizationID='+OrganizationID);
  }
}

