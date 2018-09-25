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
    return this
      .http
      .get('http://localhost:3000/api/updateFacility?facility_key=' + FacilityKey + '&facility_name=' + FacilityName + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
      .subscribe(res => console.log('Done'));
  }
  DeleteBuilding(facility_key) {
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/deleteFacility?facility_key=' + facility_key + '&employeekey=' + 2861 + '&OrganizationID=' + 21)

  }
  DeleteFloor(FacilityKey, FloorKey) {
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/deleteFloor?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21)

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
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor?pagenumber=' + 1 + '&itemsPerPage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  getZones() {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor_zone?pageno=' + 1 + '&itemsperpage=' + 1000 + '&employeekey=' + 2861 + '&OrganizationID=' + 21);
  }
  createFloors(FacilityKey, FloorName, FloorDescription) {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/addnewfloor?FacilityKey=' + FacilityKey + '&FloorDescription=' + FloorDescription + '&FloorName=' + FloorName + '&OrganizationID=' + 21 + '&employeekey=' + 2861)
      .subscribe(res => console.log('Done'));
  }
  createZones(FacilityKey, FloorName, ZoneName) {
    //debugger;
    return this
      .http
      .get('http://localhost:3000/api/addnewZone?facility=' + FacilityKey + '&floor=' + FloorName + '&zone=' + ZoneName + '&OrganizationID=' + 21 + '&employeekey=' + 2861)
      .subscribe(res => console.log('Done'));
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
    return this
      .http
      .get('http://localhost:3000/api/updateFloor?FacilityKey=' + FacilityKey + '&FloorKey=' + FloorKey + '&FloorName=' + FloorName + '&FloorDescription=' + FloorDescription + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
      .subscribe(res => console.log('Done'));
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
      OrganizationID: 21,
    };
    return this.http.post(uri, obj);
  }


  DeleteZone(FacilityKey, FloorKey, ZoneKey) {
    return this
      .http
      .get('http://localhost:3000/api/deleteZoneById?facility=' + FacilityKey + '&floorkey=' + FloorKey+ '&zoneKey=' + ZoneKey + '&employeekey=' + 2861 + '&OrganizationID=' + 21)

  }
  // @rodney ends....
}
