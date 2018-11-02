import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticSymbolResolver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  //http: HttpClient
  getBuildings(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/allfacilityByPageNo?pageno=' + page + '&itemsperpage=' + itemsCount + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  EditFacility(facKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getfacilityById?facKey=' + facKey + '&OrganizationID=' + OrgID);

  }
  EditFloorAutoGenerate(floorKey, facKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getFloorById?facKey=' + facKey + '&floorKey=' + floorKey + '&OrganizationID=' + OrgID);
  }
  UpdateBuilding(FacilityName, FacilityKey, empKey, OrgID) {
    const url = 'http://localhost:3000/api/updateFacility';
    const obj = {
      facility_key: FacilityKey,
      facility_name: FacilityName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this
      .http
      .post(url, obj);

  }
  DeleteBuilding(facility_key, empKey, OrgID) {
    const url = 'http://localhost:3000/api/deleteFacility';
    const obj = {
      facility_key: facility_key,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this
      .http
      .post(url, obj);

  }
  DeleteFloor(FacilityKey, FloorKey, empKey, OrgID) {
    const url = 'http://localhost:3000/api/deleteFloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorKey: FloorKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this
      .http
      .post(url, obj);

  }
  SearchBuilding(SearchFacility, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchBuildingList?OrganizationID=' + OrgID + '&searchFacility=' + SearchFacility)


  }
  SearchFloor(SearchFloor, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getSearchFloor?OrganizationID=' + OrgID + '&searchFloor=' + SearchFloor)


  }
  getFloors(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor?pagenumber=' + page + '&itemsPerPage=' + itemsCount + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getZones(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor_zone?pageno=' + page + '&itemsperpage=' + itemsCount + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  createFloors(FacilityKey, FloorName, FloorDescription, empKey, OrgID) {
    const url = 'http://localhost:3000/api/addnewfloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorDescription: FloorDescription,
      FloorName: FloorName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this
      .http
      .post(url, obj);
  }
  createZones(FacilityKey, FloorName, ZoneName, empKey, OrgID) {
    const url = 'http://localhost:3000/api/addnewZone';
    const obj = {
      facility: FacilityKey,
      floor: FloorName,
      zone: ZoneName,
      OrganizationID: OrgID,
      employeekey: empKey
    };
    return this
      .http
      .post(url, obj);
  }

  getallBuildingList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/allfacility?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }

  getallFloorList(facKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/floorvaluesByfacKey?key=' + facKey + '&OrganizationID=' + OrgID);
  }
  UpdateFloor(FacilityKey, FloorKey, FloorName, FloorDescription, empKey, OrgID) {
    const url = 'http://localhost:3000/api/updateFloor';
    const obj = {
      FacilityKey: FacilityKey,
      FloorKey: FloorKey,
      FloorName: FloorName,
      FloorDescription: FloorDescription,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this
      .http
      .post(url, obj);
  }

  // @rodney starts....
  searchZone(SearchZone, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchZoneList?OrganizationID=' + OrgID + '&searchZone=' + SearchZone)
  }

  EditZoneAutoGenerate(zoneKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getZoneById?zoneKey=' + zoneKey + '&OrganizationID=' + OrgID);
  }


  checkForZone(FacilityKey, FloorKey, ZoneName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewZone?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey + '&ZoneName=' + ZoneName + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  updateZone(facilityKey, facilityName, floorName, floorKey, zoneKey, zoneName, empKey, OrgID) {
    const uri = "http://localhost:3000/api/updateZone";
    const obj = {
      FacilityKey: facilityKey,
      FloorKey: floorKey,
      FacilityName: facilityName,
      FloorName: floorName,
      ZoneKey: zoneKey,
      ZoneName: zoneName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  DeleteZone(FacilityKey, FloorKey, ZoneKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteZoneById";
    const obj = {
      facility: FacilityKey,
      floorkey: FloorKey,
      zoneKey: ZoneKey,
      employeekey: empKey,
      OrganizationID: OrgID
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


  getDepartmentList(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/viewDepartmentpage?pageno=' + page + '&itemsPerPage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
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


  SearchEquipment(EquipName, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchequipment?OrganizationID=' + OrgID + '&searchEquipment=' + EquipName);
  }

  getEquipmentList(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllEquipmentTypeEquipment?pageno=' + page + '&itemsperpage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }


  DeleteEquipment(EquipKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteEquipmentById";
    const obj = {
      EquipmentKey: EquipKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getEquipmentTypeList(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllEquipmentTypes?pageno=' + page + '&itemsperpage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  SearchEquipmentType(EquipTypeName, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchEquipmentTypeList?OrganizationID=' + OrgID + '&searchEquipmentType=' + EquipTypeName);
  }

  DeleteEquipmentType(EquipTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteEquipmentTypeById";
    const obj = {
      equipmentTypeKey: EquipTypeKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  checkForNewEquipmentType(EquipmentTypeName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + EquipmentTypeName + '&type=equipmenttype' + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  addEquipmentType(EquipmentTypeName, EquipmentTypeDescription, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addnewEquipmentType";
    const obj = {
      EquipmentType: EquipmentTypeName,
      EquipmentTypeDescription: EquipmentTypeDescription,
      EquipmentTypeKey: -99,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getEquipmentTypeListEdit(equipTypeKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getEquipmentTypeKeyById?equipmentTypeKey=' + equipTypeKey + '&OrganizationID=' + OrgID);
  }

  UpdateEquipmentType(equipType, equipTypeDesc, equipTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/updateEquipmentType";
    const obj = {
      EquipmentType: equipType,
      EquipmentTypeDescription: equipTypeDesc,
      EquipmentTypeKey: equipTypeKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }



  getRoomTypeList(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllRoomType?pageno=' + page + '&itemsperpage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  SearchRoomType(RoomType, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchroomType?OrganizationID=' + OrgID + '&searchRoomType=' + RoomType);
  }

  DeleteRoomType(RoomTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteRoomTypeById";
    const obj = {
      roomTypeKey: RoomTypeKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getMetricValues(OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/metricTypevalues?OrganizationID=' + OrgID);
  }

  checkRoomType(RoomTypeName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + RoomTypeName + '&type=roomtype' + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  addRoomType(roomTypeName, MetricTypeValue, metricType, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addnewRoomtype";
    const obj = {
      RoomTypeName: roomTypeName,
      metric: 1,
      MetricType: metricType,
      TypeValue: MetricTypeValue,
      EquipmentTypeKey: -99,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getFloorTypeList(page, itemsCount, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/allFloorType?pagenumber=' + page + '&itemsPerPage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  SearchFloorType(FloorType, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchFloorTypeList?OrganizationID=' + OrgID + '&searchFloorType=' + FloorType);
  }

  DeleteFloorType(FloorTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteFloorTypeById";
    const obj = {
      floortypekey: FloorTypeKey,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  getRoomList(page, itemsCount,empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getAllRooms?pageno=' + page + '&itemsperpage=' + itemsCount + '&empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  SearchRoom(Room, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/searchRoomOnTable?OrganizationID=' + OrgID + '&searchRoom=' + Room + '&employeekey=' + empKey);
  }

  DeleteRoom(RoomKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/deleteRoomById?roomkey=" + RoomKey + "&employeekey=" + empKey + "&OrganizationID=" + OrgID;
    const obj = {};
    return this.http.post(uri, obj);
  }

  EditRoomtTypeAutoGenerate(roomTypeKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getRoomTypeById?roomTypeKey=' + roomTypeKey + '&OrganizationID=' + OrgID);
  }


  updateRoomType(roomTypeKey, metricTypeKey, metricType, roomTypeName, MetricTypeValue, empKey, OrgID) {
    const uri = "http://localhost:3000/api/updateRoomType";
    const obj = {
      RoomTypeKey: roomTypeKey,
      RoomTypeName: roomTypeName,
      metric: metricTypeKey,
      MetricType: metricType,
      TypeValue: MetricTypeValue,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }
  getBarcodeForEquipment(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getBarcodeForEquipment?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getAllEquipmentType(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/allequiptype?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  checkForNewEquipment(EquipmentTypeKey, EquipmentName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewEquipment?EquipmentTypeKey=' + EquipmentTypeKey + '&EquipmentName=' + EquipmentName + ' & employeekey=' + empKey + ' & OrganizationID=' + OrgID);
  }
  checkForNewEquipmentbarcode(barcode, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForBarcodeInventory?Barcode=' + barcode + '&type=equipment' + '&OrganizationID=' + OrgID);
  }


  addEquipment(EquipmentName, EquipmentDescription, Barcode, EquipmentTypeKey, FacKey, FloorKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addnewEquipment";
    const obj = {

      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentName: EquipmentName,
      EquipmentDescription: EquipmentDescription,
      EquipmentBarcode: Barcode,
      FacilityKey: FacKey,
      FloorKey: FloorKey,
      BarcodeINT: Barcode,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }


  EditEquipmentAutoGenerate(equipKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getEquipmentKeyById?equipmentKey=' + equipKey + '&OrganizationID=' + OrgID);
  }

  getallFloorTypeList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getFloorTypeListForRoomEdit?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getallRoomTypeList(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getRoomTypeListForRoomEdit?empkey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getBarcodeForRoom(empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getBarcodeForRoom?employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  getallZoneList(facKey, flrKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getZoneListForRoomEdit?FacilityKey=' + facKey + '&FloorKey=' + flrKey + '&OrganizationID=' + OrgID);
  }


  checkNewRoom(facilityKey, floorKey, floorTypeKey, zoneKey, roomTypeKey, roomName, empKey, OrgID) {
    const uri = "http://localhost:3000/api/checkForNewRoom";
    const obj = {

      FacilityKey: facilityKey,
      FloorKey: floorKey,
      FloorTypeKey: floorTypeKey,
      ZoneKey: zoneKey,
      RoomTypeKey: roomTypeKey,
      RoomName: roomName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }
  checkRoomBarcode(Barcode, empKey, OrgID) {

    return this
      .http
      .get('http://localhost:3000/api/checkUniqueBarcode_Updation?roomkey=' + -1 + '&barcode=' + Barcode + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }
  checkRoomName(RoomName, OrgID) {

    return this
      .http
      .get('http://localhost:3000/api/checkNewRoomName?RoomName=' + RoomName + '&OrganizationID=' + OrgID);

  }


  addRoom(facilityKey, floorKey, floorTypeKey, zoneKey, roomTypeKey, roomName, SquareFoot, barcode, empKey, OrgID) {
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
      employeekey: empKey,
      Barcode: barcode,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }



  getRoomDetailsList(RoomKey, OrgID) {

    return this
      .http
      .get('http://localhost:3000/api/getRoomById?roomKey=' + RoomKey + '&OrganizationID=' + OrgID);

  }
  checkUniqueBarcode_Updation(Barcode,roomkey,employeekey,OrganizationID) {

    return this
      .http
      .get('http://localhost:3000/api/checkUniqueBarcode_Updation?barcode='+Barcode+'&roomkey='+roomkey+'&employeekey='+employeekey+'&OrganizationID='+OrganizationID);

  }
  updateRoom(obj)
  {
    const url = 'http://localhost:3000/api/updateRoom';
    return this
      .http
      .post (url, obj);
  }

  checkForNewFloorType(FloorTypeName, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForNewInventory?checkValue=' + FloorTypeName + '&type=floortype' + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);
  }

  addNewFloorType(floorTypeName, empKey, OrgID) {
    const uri = "http://localhost:3000/api/addnewfloortype";
    const obj = {
      FloorTypeName: floorTypeName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }

  EditFloorType(FloorTypeKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/getFloorTypeById?floortypeKey=' + FloorTypeKey + '&OrganizationID=' + OrgID);

  }

  UpdateFloorType(floorTypeName, FlrTypeKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/updateFloorType";
    const obj = {
      FloorTypeKey: FlrTypeKey,
      FloorTypeName: floorTypeName,
      employeekey: empKey,
      OrganizationID: OrgID
    };
    return this.http.post(uri, obj);
  }
  updateEquipment(equipmentName, equipmentDescription, equipmentBarcode, equipTypeKey, FacKey, floorKey, equipKey, empKey, OrgID) {
    const uri = "http://localhost:3000/api/updateEquipment";
    const obj = {
      EquipmentKey: equipKey,
      EquipmentTypeKey: equipTypeKey,
      // EquipmentType: equipType,
      EquipmentName: equipmentName,
      EquipmentDescription: equipmentDescription,
      employeekey: empKey,
      EquipmentBarcode: equipmentBarcode,
      OrganizationID: OrgID,
      FacilityKey: FacKey,
      FloorKey: floorKey,
      BarcodeINT: equipmentBarcode
    };
    return this.http.post(uri, obj);
    
  }

  checkEditedRoomName(facKey, roomName, RoomKey, empKey, OrgID) {
    return this
      .http
      .get('http://localhost:3000/api/checkForEditedRoomName?roomKey=' + RoomKey + '&RoomName=' + roomName + '&FacilityKey=' + facKey + '&employeekey=' + empKey + '&OrganizationID=' + OrgID);

  }
  // @rodney ends....
}
