import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }
  getTemplateName() {
    return this
      .http
      .get('http://localhost:3000/api/getTemplates?employeekey='+2861+'&OrganizationID='+21);
  }
  getAuditorName(){
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey='+2861+'&OrganizationID='+21);
  }
  getEmployeeName(){
    return this
      .http
      .get('http://localhost:3000/api/allemployees?empkey='+2861+'&OrganizationID='+21);
  }
  getBuildingName(){
    return this
    .http
    .get('http://localhost:3000/api/allfacility?empkey='+2861+'&OrganizationID='+21);
  }
  getallFloorNames(key){
    return this
    .http
    .get('http://localhost:3000/api/domainvaluesByKey?domain=facilityOnly'+'&key='+key+'&OrganizationID='+21);
  }
  getallZones(fkey,flkey){
    // debugger;
    return this
    .http
    .get('http://localhost:3000/api/zoneByFacility_Floor?fkey='+fkey+'&floorkey='+flkey+'&OrganizationID='+21);
  }
  getallRooms(fkey,flkey){
    return this
    .http
    .get('http://localhost:3000/api/roomByFacility_Floor?fkey='+fkey+'&floorkey='+flkey+'&OrganizationID='+21);
  }
  getallRoomType(fkey,flkey){
    return this
    .http
    .get('http://localhost:3000/api/roomtypeByFacility_Floor?fkey='+fkey+'&floorkey='+flkey+'&OrganizationID='+21);
  }
  getScoreTypeList(){
    return this
    .http
    .get('http://localhost:3000/api/scoringtype?OrganizationID='+21);
  }
  createInspectionTemplate(ScoreTypeKey,InspTempName,QustArry) {
     const url='http://localhost:3000/api/addTemplatequestion';
     const obj = {
      scoringTypeKey : ScoreTypeKey,
      question : QustArry,
      templatename :InspTempName,
      employeekey: 2861,
      OrganizationID:21
      };
     return this
       .http
       .post (url,obj).subscribe(res => console.log('Done'));
  }
  createInspections(TemplateID,SupervisorKey,fromdate,todate,theCheckbox,time,RoomKey){
    const url='http://localhost:3000/api/addInspectionOrderwithRecurring';
    const obj = {
      templateID : TemplateID,
      supervisorKey : SupervisorKey,
      inspectionFromDate : fromdate,
      inspectionToDate : todate ,
      isRecurring : theCheckbox,
      inspectiontime : time,
      roomKey:RoomKey,
      OrganizationID : 21,
      empkey:2861,
      metaUpdatedBy:2861,
      fulltime:fromdate+" "+time
     };
    return this
      .http
      .post (url,obj).subscribe(res => console.log('Done'));
  }
  getTemplateNameList(){
    return this
    .http
    .get('http://localhost:3000/api/getTempDetailsForDropdown?employeekey='+2861+'&OrganizationID='+21);
  }
  getInspectionTemplateTable(key){
    return this
    .http
    .get('http://localhost:3000/api/getTemplateFilterByTemplateID?key='+key+'&OrganizationID='+21);
  }
  DeleteInspectionTemplate(templateID,templateQuestionID){
    const url='http://localhost:3000/api/deleteInspectionTemplateQuestions';
    const obj = {
      templateID : templateID,
      templateQuestionID : templateQuestionID,
      updatedBy :2861,
      OrganizationID: 21     
      };
     return this
       .http
       .post (url,obj);
  }
  getInspectionTemplateDetails(){
    return this
    .http
    .get('http://localhost:3000/api/getTemplateDetails?pageno='+1+'&itemsPerPage='+25+'&empkey='+2861+'&OrganizationID='+21);

  }
  getInspectionOrderTablewithFromCurrentDateFilter(curr_date){
    return this
    .http
    .get('http://localhost:3000/api/viewInspection?pageno='+1+'&itemsPerPage='+25+'&inspectionDate='+curr_date+'&employeekey='+2861+'&OrganizationID='+21);
  }
  getInspectionOrderTablewithFromDateandToDateFilter(date1,date2){
    return this
    .http
    .get('http://localhost:3000/api/viewAllInspectionByDates?search_DT='+date1+'&search_DT2='+date2+'&employeekey='+2861+'&OrganizationID='+21);
  }
  getInspectionOrderTablewithFromDateOnly(date1){
    return this
    .http
    .get('http://localhost:3000/api/viewInspection?pageno='+1+'&itemsPerPage='+25+'&inspectionDate='+date1+'&employeekey='+2861+'&OrganizationID='+21);
  }
  DeleteTemplate(templateID){
    const url='http://localhost:3000/api/deleteInspectionTemplate';
    const obj = {
      templateID : templateID,
      updatedBy :2861,
      OrganizationID: 21     
      };
     return this
       .http
       .post (url,obj);
  }
  SearchTemplate(searchMytemp){
    return this
      .http
      .get('http://localhost:3000/api/searchMytemplate?OrganizationID='+21+'&searchMytemp='+searchMytemp)
  }
  SearchTempNameandQuestion(searchMytemp,TemplateID){
    return this
      .http
      .get('http://localhost:3000/api/searchtemplateQun?OrganizationID='+21+'&searchMytemp='+searchMytemp+'&TemplateID='+TemplateID)
  }
  SearchTemplateandLocation(SearchValue,search_DT,search_DT2){
    return this
    .http
    .get('http://localhost:3000/api/searchInspectionOrder?OrganizationID='+21+'&searchLocation='+SearchValue+'&search_DT='+search_DT+'&search_DT2='+search_DT2)
  }
  getViewInspectionManager(ioKey,OrgId){
    return this
    .http
    .get('http://localhost:3000/api/getinspectionDetails?inspectionorder='+ioKey+'&OrganizationID='+OrgId)
  }
  InspectionDetails(Insp_Key)
  {
    return this
    .http
    .get('http://localhost:3000/api/getInspectionorder?InspectionorderKey=' + Insp_Key+"&OrganizationID="+21);
  }
  templateQuestionService(templateId)
  {
    return this
    .http
    .get('http://localhost:3000/api/getTemplateQuestions?templateId='+ templateId+"&OrganizationID="+21);
  }
  InspectionSaveService(inspectionDetail)
  {
    const url='http://localhost:3000/api/saveinspectedQuestions';
    
    return this
      .http
      .post (url,inspectionDetail).subscribe(res => console.log('Done'));
  }
  inspectionCompletedService(inspectionDetail1)
  {
    const url='http://localhost:3000/api/inspectionCompleted';
    
    return this
      .http
      .post (url,inspectionDetail1).subscribe(res => console.log('Done'));
  }
  updateEditedTemplateQuestion(obj){
    const url='http://localhost:3000/api/updateEditedTemplateQuestion';
    return this
    .http
    .post (url,obj);
  }
  insertEditedTemplateQuestion(obj){
    const url='http://localhost:3000/api/insertEditedTemplateQuestion';
    return this
    .http
    .post (url,obj);
  }
  updateTemplateDetails(templatename,tempEditid,OrganizationID,ScoreTypeKey) {
    return this
    .http
    .get('http://localhost:3000/api/updateTemplateDetails?templatename='+templatename+'&tempEditid='+tempEditid+'&OrganizationID='+OrganizationID+'&ScoreTypeKey='+ScoreTypeKey);

  }
  getTemplateQuestionsEditDetails(templateid, OrganizationID) {
    return this
    .http
    .get('http://localhost:3000/api/getTemplateQuestionsEditDetails?templateid=' + templateid + '&OrganizationID=' + OrganizationID);

  }
  deleteSelectedTemplateQuestion(templateID, OrganizationID){
    return this
    .http
    .get('http://localhost:3000/api/deleteSelectedTemplateQuestion?templateID='+templateID+'&OrganizationID='+OrganizationID);

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
  checkforInspectionOnTemplate(templateid,OrganizationID){
    return this
    .http
    .get('http://localhost:3000/api/checkforInspectionOnTemplate?templateid='+templateid+'&OrganizationID='+OrganizationID);
  }
  updateEditInspection(TemplateName, TemplateID, ScoreTypeKey, OrganizationID) {
    return this
    .http
    .get('http://localhost:3000/api/updateEditInspection?TemplateName='+TemplateName+'&TemplateID='+TemplateID+'&ScoreTypeKey='+ScoreTypeKey+'&OrganizationID='+OrganizationID);

  }
  SearchTemplateandLocationbysuprvsr(SearchValue,orgid,toservempkey,newdate){
    return this
    .http
    .get('http://localhost:3000/api/searchinspection?searchWO='+SearchValue+'&OrganizationID='+orgid+'&toServeremployeekey='+toservempkey+'&today_DT='+newdate);

  }
  getInspectionOrderTablewithCurrentDatefrsprvsr(curr_date,toservempkey,orgid)
  {
    return this
    .http
    .get('http://localhost:3000/api/getSupervisorInspectionView?to_date='+curr_date+'&employeekey='+toservempkey+'&OrganizationID='+orgid);

  }
  }

