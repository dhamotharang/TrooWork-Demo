import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticSymbolResolver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  //http: HttpClient
  getBuildings() {
    return this
      .http
      .get('http://localhost:3000/api/allfacilityByPageNo?pageno=' + 1 + '&itemsperpage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  EditFacility(facKey) {
    return this
      .http
      .get('http://localhost:3000/api/getfacilityById?facKey=' + facKey + '&OrganizationID=' + 21);

  }
  EditFloorAutoGenerate(floorKey, facKey) {
    return this
      .http
      .get('http://localhost:3000/api/getFloorById?facKey=' + facKey + '&floorKey=' + floorKey + '&OrganizationID=' + 21);
  }
  UpdateBuilding(FacilityName, FacilityKey) {
    // debugger;
    // return this
    //   .http
    //   .get('http://localhost:3000/api/updateFacility?facility_key=' + FacilityKey + '&facility_name=' + FacilityName + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
    //   .subscribe(res => console.log('Done'));
    const url = 'http://localhost:3000/api/updateFacility';
    const obj = {
      facility_key: FacilityKey,
      facility_name: FacilityName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this
      .http
      .post(url, obj).subscribe(res => console.log('Done'));

  }
  DeleteBuilding(facility_key) {
    // debugger;
    // return this
    //   .http
    //   .get('http://localhost:3000/api/deleteFacility?facility_key=' + facility_key + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
    const url = 'http://localhost:3000/api/deleteFacility';
    const obj = {
      facility_key: facility_key,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this
      .http
      .post(url, obj);

  }
  DeleteFloor(FacilityKey, FloorKey) {
    // debugger;
    // return this
    //   .http
    //   .get('http://localhost:3000/api/deleteFloor?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
    const url = 'http://localhost:3000/api/deleteFloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorKey: FloorKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this
      .http
      .post(url, obj);

  }
  SearchBuilding(SearchFacility) {
    return this
      .http
      .get('http://localhost:3000/api/searchBuildingList?OrganizationID=' + 21 + '&searchFacility=' + SearchFacility)


  }
  SearchFloor(SearchFloor) {
    return this
      .http
      .get('http://localhost:3000/api/getSearchFloor?OrganizationID=' + 21 + '&searchFloor=' + SearchFloor)


  }
  getFloors() {
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor?pagenumber=' + 1 + '&itemsPerPage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getZones() {
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor_zone?pageno=' + 1 + '&itemsperpage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  createFloors(FacilityKey, FloorName, FloorDescription) {
    // debugger;
    // return this
    //   .http
    //   .get('http://localhost:3000/api/addnewfloor?FacilityKey=' + FacilityKey + '&FloorDescription=' + FloorDescription + '&FloorName=' + FloorName + '&OrganizationID=' + 21 + '&employeekey=' + 2861)
    //   .subscribe(res => console.log('Done'));
    const url = 'http://localhost:3000/api/addnewfloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorDescription: FloorDescription,
      FloorName: FloorName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this
      .http
      .post(url, obj).subscribe(res => console.log('Done'));
  }
  createZones(FacilityKey, FloorName, ZoneName) {
    //debugger;
    // return this
    //   .http
    //   .get('http://localhost:3000/api/addnewZone?facility=' + FacilityKey + '&floor=' + FloorName + '&zone=' + ZoneName + '&OrganizationID=' + 21 + '&employeekey=' + 2861)
    //   .subscribe(res => console.log('Done'));
    const url = 'http://localhost:3000/api/addnewZone';
    const obj = {
      facility: FacilityKey,
      floor: FloorName,
      zone: ZoneName,
      OrganizationID: 21,
      employeekey: 2861
    };
    return this
      .http
      .post(url, obj).subscribe(res => console.log('Done'));
  }

  getallBuildingList() {
    return this
      .http
      .get('http://localhost:3000/api/allfacility?empkey=' + 2861 + '&OrganizationID=' + 21);
  }

  getallFloorList(facKey) {
    return this
      .http
      .get('http://localhost:3000/api/floorvaluesByfacKey?key=' + facKey + '&OrganizationID=' + 21);
  }
  UpdateFloor(FacilityKey, FloorKey, FloorName, FloorDescription) {
    // return this
    //   .http
    //   .get('http://localhost:3000/api/updateFloor?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey + '&FloorName=' + FloorName + '&FloorDescription=' + FloorDescription + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
    //   .subscribe(res => console.log('Done'));
    const url = 'http://localhost:3000/api/updateFloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorKey: FloorKey,
      FloorName: FloorName,
      FloorDescription: FloorDescription,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this
      .http
      .post(url, obj).subscribe(res => console.log('Done'));
  }

  // @rodney starts....
  searchZone(SearchZone) {
    return this
      .http
      .get('http://localhost:3000/api/searchZoneList?OrganizationID=' + 21 + '&searchZone=' + SearchZone)
  }

  EditZoneAutoGenerate(zoneKey) {
    return this
      .http
      .get('http://localhost:3000/api/getZoneById?zoneKey=' + zoneKey + '&OrganizationID=' + 21);
  }


  checkForZone(FacilityKey, FloorKey, ZoneName) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewZone?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey +
        '&ZoneName=' + ZoneName + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  updateZone(facilityKey, facilityName, floorName, floorKey, zoneKey, zoneName) {
    const uri = "http://localhost:3000/api/updateZone";
    const obj = {
      FacilityKey: facilityKey,
      FloorKey: floorKey,
      FacilityName: facilityName,
      FloorName: floorName,
      ZoneKey: zoneKey,
      ZoneName: zoneName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }


  DeleteZone(FacilityKey, FloorKey, ZoneKey) {
    const uri = "http://localhost:3000/api/deleteZoneById";
    const obj = {
      facility: FacilityKey,
      floorkey: FloorKey,
      zoneKey: ZoneKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  checkForNewDepartment(DeptName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + DeptName + '&type=department' + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  addDepartment(DeptName, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addNewDepartment";
    const obj = {
      DepartmentName: DeptName,
      empkey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  getDepartmentList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewDepartmentpage?pageno=' + 1 + '&itemsPerPage=' + 1000 + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }

  SearchDepartment(DeptName, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchDepartmentType?OrganizationID=' + OrgID + '&searchDepartment=' + DeptName)
  }

  DeleteDepartment(deptKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteDepartment";
    const obj = {
      DepartmentKey: deptKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  EditDepartment(deptKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/editviewDepartment?DepartmentKey=' + deptKey + '&OrganizationID=' + OrgID);

  }
  UpdateDepartment(departmentName, departmentKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/editSelectedDepartment";
    const obj = {
      DepartmentKey: departmentKey,
      DepartmentName: departmentName,
      empkey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  SearchEquipment(EquipName) {
    return this
      .http
      .get('http://localhost:3000/api/searchequipment?OrganizationID=' + 21 + '&searchEquipment=' + EquipName);
  }

  getEquipmentList() {
    return this
      .http
      .get('http://localhost:3000/api/getAllEquipmentTypeEquipment?pageno=' + 1 + '&itemsperpage=' + 1000 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }


  DeleteEquipment(EquipKey) {
    const uri = "http://localhost:3000/api/deleteEquipmentById";
    const obj = {
      EquipmentKey: EquipKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  getEquipmentTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/getAllEquipmentTypes?pageno=' + 1 + '&itemsperpage=' + 1000 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  SearchEquipmentType(EquipTypeName) {
    return this
      .http
      .get('http://localhost:3000/api/searchEquipmentTypeList?OrganizationID=' + 21 + '&searchEquipmentType=' + EquipTypeName);
  }

  DeleteEquipmentType(EquipTypeKey) {
    const uri = "http://localhost:3000/api/deleteEquipmentTypeById";
    const obj = {
      equipmentTypeKey: EquipTypeKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  checkForNewEquipmentType(EquipmentTypeName) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + EquipmentTypeName + '&type=equipmenttype' + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  addEquipmentType(EquipmentTypeName, EquipmentTypeDescription) {
    const uri = "http://localhost:3000/api/addnewEquipmentType";
    const obj = {
      EquipmentType: EquipmentTypeName,
      EquipmentTypeDescription: EquipmentTypeDescription,
      EquipmentTypeKey: -99,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  getEquipmentTypeListEdit(equipTypeKey) {
    return this
      .http
      .get('http://localhost:3000/api/getEquipmentTypeKeyById?equipmentTypeKey=' + equipTypeKey + '&OrganizationID=' + 21);
  }

  UpdateEquipmentType(equipType, equipTypeDesc, equipTypeKey) {
    const uri = "http://localhost:3000/api/updateEquipmentType";
    const obj = {
      EquipmentType: equipType,
      EquipmentTypeDescription: equipTypeDesc,
      EquipmentTypeKey: equipTypeKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }



  getRoomTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/getAllRoomType?pageno=' + 1 + '&itemsperpage=' + 1000 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  SearchRoomType(RoomType) {
    return this
      .http
      .get('http://localhost:3000/api/searchroomType?OrganizationID=' + 21 + '&searchRoomType=' + RoomType);
  }

  DeleteRoomType(RoomTypeKey) {
    const uri = "http://localhost:3000/api/deleteRoomTypeById";
    const obj = {
      roomTypeKey: RoomTypeKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  getMetricValues() {
    return this
      .http
      .get('http://localhost:3000/api/metricTypevalues?OrganizationID=' + 21);
  }

  checkRoomType(RoomTypeName) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + RoomTypeName + '&type=roomtype' + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  addRoomType(roomTypeName, MetricTypeValue, metricType) {
    const uri = "http://localhost:3000/api/addnewRoomtype";
    const obj = {
      RoomTypeName: roomTypeName,
      metric: 1,
      MetricType: metricType,
      TypeValue: MetricTypeValue,
      EquipmentTypeKey: -99,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  getFloorTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/allFloorType?pagenumber=' + 1 + '&itemsPerPage=' + 1000 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  SearchFloorType(FloorType) {
    return this
      .http
      .get('http://localhost:3000/api/searchFloorTypeList?OrganizationID=' + 21 + '&searchFloorType=' + FloorType);
  }

  DeleteFloorType(FloorTypeKey) {
    const uri = "http://localhost:3000/api/deleteFloorTypeById";
    const obj = {
      floortypekey: FloorTypeKey,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  getRoomList() {
    return this
      .http
      .get('http://localhost:3000/api/getAllRooms?pageno=' + 1 + '&itemsperpage=' + 1000 + '&empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  SearchRoom(Room) {
    return this
      .http
      .get('http://localhost:3000/api/searchRoomOnTable?OrganizationID=' + 21 + '&searchRoom=' + Room + '&employeekey=' + 2861);
  }

  DeleteRoom(RoomKey) {
    const uri = "http://localhost:3000/api/deleteRoomById?roomkey=" + RoomKey + "&employeekey=" + 2861 + "&OrganizationID=" + 21;
    const obj = {};
    return this.http.post(uri, obj);
  }

  EditRoomtTypeAutoGenerate(roomTypeKey) {
    return this
      .http
      .get('http://localhost:3000/api/getRoomTypeById?roomTypeKey=' + roomTypeKey + '&OrganizationID=' + 21);
  }


  updateRoomType(roomTypeKey, metricTypeKey, metricType, roomTypeName, MetricTypeValue) {
    const uri = "http://localhost:3000/api/updateRoomType";
    const obj = {
      RoomTypeKey: roomTypeKey,
      RoomTypeName: roomTypeName,
      metric: metricTypeKey,
      MetricType: metricType,
      TypeValue: MetricTypeValue,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  getBarcodeForEquipment() {
    return this
      .http
      .get('http://localhost:3000/api/getBarcodeForEquipment?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getAllEquipmentType() {
    return this
      .http
      .get('http://localhost:3000/api/allequiptype?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  checkForNewEquipment(EquipmentTypeKey, EquipmentName) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewEquipment?EquipmentTypeKey=' + EquipmentTypeKey + '&EquipmentName=' + EquipmentName + ' & employeekey=' + 2861 + ' & OrganizationID=' + 21);
  }
  checkForNewEquipmentbarcode(barcode) {
    return this
      .http
      .get('http://localhost:3000/api/checkForBarcodeInventory?Barcode=' + barcode + '&type=equipment' + '&OrganizationID=' + 21);
  }


  addEquipment(EquipmentName, EquipmentDescription, Barcode, EquipmentTypeKey, FacKey, FloorKey) {
    const uri = "http://localhost:3000/api/addnewEquipment";
    const obj = {

      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentName: EquipmentName,
      EquipmentDescription: EquipmentDescription,
      EquipmentBarcode: Barcode,
      FacilityKey: FacKey,
      FloorKey: FloorKey,
      BarcodeINT: Barcode,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }


  EditEquipmentAutoGenerate(equipKey) {
    return this
      .http
      .get('http://localhost:3000/api/getEquipmentKeyById?equipmentKey=' + equipKey + '&OrganizationID=' + 21);
  }

  getallFloorTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/getFloorTypeListForRoomEdit?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  getallRoomTypeList() {
    return this
      .http
      .get('http://localhost:3000/api/getRoomTypeListForRoomEdit?empkey=' + 2861 + '&OrganizationID=' + 21);
  }
  getBarcodeForRoom() {
    return this
      .http
      .get('http://localhost:3000/api/getBarcodeForRoom?employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getallZoneList(facKey, flrKey) {
    return this
      .http
      .get('http://localhost:3000/api/getZoneListForRoomEdit?FacilityKey=' + facKey + '&FloorKey=' + flrKey + '&OrganizationID=' + 21);
  }


  checkNewRoom(facilityKey, floorKey, floorTypeKey, zoneKey, roomTypeKey, roomName) {
    const uri = "http://localhost:3000/api/checkForNewRoom";
    const obj = {

      FacilityKey: facilityKey,
      FloorKey: floorKey,
      FloorTypeKey: floorTypeKey,
      ZoneKey: zoneKey,
      RoomTypeKey: roomTypeKey,
      RoomName: roomName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  checkRoomBarcode(Barcode) {

    return this
      .http
      .get('http://localhost:3000/api/checkUniqueBarcode_Updation?roomkey=' + -1 + '&barcode=' + Barcode + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  checkRoomName(RoomName) {

    return this
      .http
      .get('http://localhost:3000/api/checkNewRoomName?RoomName=' + RoomName + '&OrganizationID=' + 21);

  }


  addRoom(facilityKey, floorKey, floorTypeKey, zoneKey, roomTypeKey, roomName, SquareFoot, barcode) {
    const uri = "http://localhost:3000/api/addnewRoom";
    const obj = {

      FacilityKey: facilityKey,
      FloorKey: floorKey,
      FloorTypeKey: floorTypeKey,
      ZoneKey: zoneKey,
      RoomTypeKey: roomTypeKey,
      roomkey: -99,
      Area: SquareFoot,
      RoomName: roomName,
      employeekey: 2861,
      Barcode: barcode,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }



  getRoomDetailsList(RoomKey) {

    return this
      .http
      .get('http://localhost:3000/api/getRoomById?roomKey=' + RoomKey + '&OrganizationID=' + 21);

  }

  checkForNewFloorType(FloorTypeName) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + FloorTypeName + '&type=floortype' + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }

  addNewFloorType(floorTypeName) {
    const uri = "http://localhost:3000/api/addnewfloortype";
    const obj = {
      FloorTypeName: floorTypeName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }

  EditFloorType(FloorTypeKey) {
    return this
      .http
      .get('http://localhost:3000/api/getFloorTypeById?floortypeKey=' + FloorTypeKey + '&OrganizationID=' + 21);

  }

  UpdateFloorType(floorTypeName, FlrTypeKey) {
    const uri = "http://localhost:3000/api/updateFloorType";
    const obj = {
      FloorTypeKey: FlrTypeKey,
      FloorTypeName: floorTypeName,
      employeekey: 2861,
      OrganizationID: 21
    };
    return this.http.post(uri, obj);
  }
  updateEquipment(equipmentName, equipmentDescription, equipmentBarcode, equipTypeKey, FacKey, floorKey, equipKey) {
    const uri = "http://localhost:3000/api/updateEquipment";
    const obj = {
      EquipmentKey: equipKey,
      EquipmentTypeKey: equipTypeKey,
      EquipmentType: 2861,
      EquipmentName: equipmentName,
      EquipmentDescription: equipmentDescription,
      employeekey: 2861,
      EquipmentBarcode: equipmentBarcode,
      OrganizationID: 21,
      FacilityKey: FacKey,
      FloorKey: floorKey,
      BarcodeINT: equipmentBarcode
    };
    return this.http.post(uri, obj);
  }

  checkEditedRoomName(facKey, roomName, RoomKey) {
    return this
      .http
      .get('http://localhost:3000/api/checkForEditedRoomName?roomKey=' + RoomKey + '&RoomName=' + roomName + '&FacilityKey=' + facKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21);

  }
  // @rodney ends....
}
