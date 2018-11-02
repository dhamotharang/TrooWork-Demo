import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
  // code by sudina starts
  getallsupervisor(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/supervisorname?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getinspectionreport(fromdate, todate, SupervisorKey, orgID) {

    return this
      .http
      .get('http://localhost:3000/api/viewinspection_Filter?key=' + SupervisorKey + '&searchDT=' + fromdate + '&searchDT2=' + todate + '&OrganizationID=' + orgID);
  }
  getinspectionreport_bydate(fromdate, todate, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewinspectionReport_FilterByDates?employeekey=' + empKey + '&searchDT=' + fromdate + '&searchDT2=' + todate + '&OrganizationID=' + orgID);
  }
  getallemployee(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allemployees?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getallworkordertype(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allWorkordertype?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getpievalues(currentdate, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/valuesForPie?date=' + currentdate + '&empkey=' + empKey + '&userkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getdashboardreport(dateTemp_1, dateTemp_2, em_Key, Workorder_TypeKey, empKey, orgID) {
    const url = 'http://localhost:3000/api/getEmployeeForPie';
    const obj = {
      Date: dateTemp_1,
      Date1: dateTemp_2,
      EmployeeKey: em_Key,
      WorkorderTypeKey: Workorder_TypeKey,
      managerKey: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  getvaluesfilterbypie(dateTemp_1, dateTemp_2, em_Key, Workorder_TypeKey, org_id, Manager) {
    debugger;
    const url = 'http://localhost:3000/api/workorderByfilterPie';
    const obj = {
      manager: Manager,
      workorderDate: dateTemp_1,
      workorderDate2: dateTemp_2,
      employeekey: em_Key,
      workorderTypeKey: Workorder_TypeKey,
      OrganizationID: org_id
    };
    return this
      .http
      .post(url, obj);

  }
  getallbatchschedules(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getBatchScheduleName?empkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getbatchschedulereport(Workorder_ScheduleKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/BatchSchedule_Report?WorkorderScheduleKey=' + Workorder_ScheduleKey + '&OrganizationID=' + orgID);
  }
  getScheduleAssignReport(Workorder_ScheduleKey, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewScheduleReport?BatchScheduleNameKey=' + Workorder_ScheduleKey + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  // code by sudina ends


  // code by Anju starts
  //Services for barcode reporting 
  getBarcodeReport(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allfacility?empkey=' + empKey + '&OrganizationID=' + orgID);
  }

  getEquipmentType(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/allequiptype?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getEquipment(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getallEquipments?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getFloor(key, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/domainvaluesByKey?domain=facilityOnly&key=' + key + '&OrganizationID=' + orgID);
  }
  getZone(fkey, floorkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/zoneByFacility_Floor?fkey=' + fkey + '&floorkey=' + floorkey + '&OrganizationID=' + orgID);
  }

  getRoomtype(fkey, floorkey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/roomtypeByFacility_Floor?fkey=' + fkey + '&floorkey=' + floorkey + '&OrganizationID=' + orgID);
  }


  generateBarcodeReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, empKey, orgID) {
    const url = 'http://localhost:3000/api/barcodeReportByallFilters';
    const obj = {
      OrganizationID: orgID,
      manager: empKey,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey


    };
    return this
      .http
      .post(url, obj);

  }
  // generateBarcodeByEqupiment(EquipmentKey, EquipmentTypeKey, empKey, orgID) {
  //   const url = 'http://localhost:3000/api/barcodeReportByEquipment';
  //   const obj = {
  //     OrganizationID: orgID,
  //     employeekey: empKey,
  //     EquipmentTypeKey: EquipmentTypeKey,
  //     EquipmentKey: EquipmentKey


  //   };
  //   return this
  //     .http
  //     .post(url, obj);
  // }

  //services for workorder reporting
  getEmployee(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllValueByDomain?domainName=employees&empkey' + empKey + '&OrganizationID=' + orgID);
  }

  getWorkstatus(empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllValueByDomain?domainName=workstatus&empkey' + empKey + '&OrganizationID=' + orgID);
  }

  getRooms(fkey, floorkey, zonekey, empKey, orgID) {
    return this
      .http
      .get('http://localhost:3000/api/roomByFacility_Floor_zone?fkey=' + fkey + '&floorkey=' + floorkey + '&zonekey=' + zonekey + '&OrganizationID=' + orgID);
  }

  // generateWorkOrderReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, todate, RoomKey, EmployeeKey, WorkorderStatusKey, empKey, orgID) {
  //   const url = 'http://localhost:3000/api/workorderReportByallFilters';
  //   const obj = {
  //     OrganizationID: 21,
  //     manager: 2861,
  //     facilitykey: FacilityKey,
  //     floorKey: FloorKey,
  //     roomTypeKey: RoomTypeKey,
  //     zoneKey: ZoneKey


  //   };
  //   return this
  //     .http
  //     .post(url, obj);

  // }
  generateBarcodeByEqupimenttype(EquipmentKey, EquipmentTypeKey, employeekey, OrganizationID) {
    const url = 'http://localhost:3000/api/barcodeReportByEquipment';
    const obj = {
      OrganizationID: OrganizationID,
      employeekey: employeekey,
      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentKey: EquipmentKey


    };
    return this
      .http
      .post(url, obj);
  }
  //Pooja's code starts here
  generateBarcodeByEqupiment(EquipmentKey, EquipmentTypeKey, employeekey, OrganizationID) {
    const url = 'http://localhost:3000/api/barcodeReportByEquipment';
    const obj = {
      OrganizationID: OrganizationID,
      employeekey: employeekey,
      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentKey: EquipmentKey

    };

    return this
      .http
      .post(url, obj);
  }
  getRoom(fkey, floorkey,OrganizationID)
  {
    return this
      .http
      .get('http://localhost:3000/api/roomByFacility_Floor?fkey='+fkey+'&floorkey='+floorkey+'&OrganizationID='+OrganizationID);
  }
  generateWorkOrderReportServicewithdate(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, date1, RoomKey, EmployeeKey, WorkorderStatusKey,employeekey, OrganizationID)
  {
    const url = 'http://localhost:3000/api/workorderReportByallFilters';
    const obj = {
      OrganizationID: OrganizationID,
      manager: employeekey,
      workorderDate: fromdate,
      workorderDate2: date1,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey,
      roomKey: RoomKey,
      employeeKey: EmployeeKey,
      workorderStatusKey: WorkorderStatusKey
    };
    return this
      .http
      .post(url, obj);


  }
  
  //Pooja's code ends here

  //services for workorder reporting
  // getEmployee() {
  //   return this
  //     .http
  //     .get('http://localhost:3000/api/getAllValueByDomain?domainName=employees&empkey' + 2861 + '&OrganizationID=' + 21);
  // }

  // getWorkstatus() {
  //   return this
  //     .http
  //     .get('http://localhost:3000/api/getAllValueByDomain?domainName=workstatus&empkey' + 2861 + '&OrganizationID=' + 21);
  // }

  // getRooms(fkey, floorkey, zonekey) {
  //   return this
  //     .http
  //     .get('http://localhost:3000/api/roomByFacility_Floor_zone?fkey=' + fkey + '&floorkey=' + floorkey + '&zonekey=' + zonekey + '&OrganizationID=' + 21);
  // }

  generateWorkOrderReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, todate, RoomKey, EmployeeKey, WorkorderStatusKey, empKey, orgID) {
    // debugger;
    const url = 'http://localhost:3000/api/workorderReportByallFilters';
    const obj = {
      OrganizationID: orgID,
      manager: empKey,
      workorderDate: fromdate,
      workorderDate2: todate,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey,
      roomKey: RoomKey,
      employeeKey: EmployeeKey,
      workorderStatusKey: WorkorderStatusKey
    };
    return this
      .http
      .post(url, obj);

  }

  //code by Anju Ends
}
