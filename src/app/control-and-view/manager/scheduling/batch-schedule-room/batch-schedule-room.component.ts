import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
import { Scheduling } from '../../../../model-class/Schedulng';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { Router } from "@angular/router";
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
@Component({
  selector: 'app-batch-schedule-room',
  templateUrl: './batch-schedule-room.component.html',
  styleUrls: ['./batch-schedule-room.component.scss']
})
export class BatchScheduleRoomComponent implements OnInit {
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  scheduledroomList;
  allroomList;
  scheduleNameList: Scheduling[];
  building: Inventory[];
  floorType: Inventory[];
  BatchScheduleNameKey: Number = 0;
  checkValue = [];
  roomsKey = [];
  index: number = 0;
  FloorList: any;
  floorTypeList: any;
  zonelist: any;
  RoomTypeList: any;
  RoomList: any;
  pageno = 1;
  itemsPerPage = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  loading: boolean;

  bldgKey = null;
  flrKey = null;
  zoneKey = null;
  rTypeKey = null;
  rKey = null;
  flrTypeKey = null;
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  constructor(private scheduleServ: SchedulingService, private inventoryService: InventoryService, private router: Router, private WorkOrderServiceService: WorkOrderServiceService) { }

  getScheduleRoomDetails(key) {

    this.loading = true;
    this.BatchScheduleNameKey = key;
    this.scheduleServ
      .getSchedulingRoomList(key, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.scheduledroomList = data;
        this.loading = false;
      });
    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });

    this.scheduleServ
      .getAllOtherRoomList(key, this.OrganizationID, this.pageno, this.itemsPerPage)
      .subscribe((data: any[]) => {
        this.allroomList = data;
        if (this.allroomList[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.allroomList[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        for (var i = 0; i < this.allroomList.length; i++) {
          this.allroomList.roomCheck = false;
        }
      });
  }

  setRoomKey(room) {
    this.rKey = room;
  }

  setFlrTypeKey(flrType) {
    this.flrTypeKey = flrType;
  }

  viewRooms_Filter() {
    this.loading = true;
    this.scheduleServ
      .getAllRoomFilterList(this.BatchScheduleNameKey, this.OrganizationID,
        this.bldgKey, this.flrKey, this.zoneKey, this.rTypeKey, this.rKey, this.flrTypeKey)
      .subscribe((data: any[]) => {
        this.allroomList = data;
        this.loading = false;
      });
  }

  previousPage() {
    this.loading = true;
    this.pageno = +this.pageno - 1;
    this.scheduleServ
      .getAllOtherRoomList(this.BatchScheduleNameKey, this.OrganizationID, this.pageno, this.itemsPerPage)
      .subscribe((data: any[]) => {
        this.allroomList = data; this.loading = false;
        if (this.pageno == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  nextPage() {
    this.loading = true;
    this.pageno = +this.pageno + 1;
    this.scheduleServ
      .getAllOtherRoomList(this.BatchScheduleNameKey, this.OrganizationID, this.pageno, this.itemsPerPage)
      .subscribe((data: any[]) => {
        this.allroomList = data;
        this.loading = false;
        this.pagination = +this.allroomList[0].totalItems / (+this.pageno * (+this.itemsPerPage));
        if (this.pagination > 1) {
          this.showHide2 = true;
          this.showHide1 = true;
        }
        else {
          this.showHide2 = false;
          this.showHide1 = true;
        }
      });
  }

  checkBoxValueForRoom(checkValue, roomKey) {

    var i = this.index;
    if (this.BatchScheduleNameKey == 0) {
      alert("Select a Batch Schedule Name");
    } else {
      this.checkValue[i] = checkValue;
      this.roomsKey[i] = roomKey;
      this.index = this.index + 1;
    }
  }

  addRoomToSchedule() {
    var addRoomList = [];
    var addRoomString;

    if (this.checkValue.length > 0) {
      for (var j = 0; j < this.checkValue.length; j++) {
        if (this.checkValue[j] === true)
          addRoomList.push(this.roomsKey[j]);
      }
      addRoomString = addRoomList.join(',');
      if (addRoomList.length > 0) {

        this.scheduleServ
          .addRoomToSchedule(this.BatchScheduleNameKey, addRoomString, this.employeekey, this.OrganizationID)
          .subscribe(res => {
            alert("Selected Rooms Successfully added to Schedule");
            // this.router.navigateByUrl('/editScheduleForReport/');
            this.router.navigate(['/editScheduleForReport', this.BatchScheduleNameKey]);
          });
      }
    }
    else {
      alert("Please select Rooms  !");
    }
    this.checkValue = [];
    this.roomsKey = [];
  }

  getFloorDisp(facilityName) {
    if (!facilityName) {
      facilityName = 0;
    }
    this.bldgKey = facilityName;
    this.WorkOrderServiceService
      .getallFloor(facilityName, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.FloorList = data;
      });
  }
  getZoneRoomTypeRoom(floor, facility) {
    this.bldgKey = facility;
    this.flrKey = floor;
    this.WorkOrderServiceService
      .getzone_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.zonelist = data;
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, null, null, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
      });
    this.WorkOrderServiceService
      .getroomType_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
  }
  getRoomTypeRoom(zone, facility, floor) {
    this.bldgKey = facility;
    this.flrKey = floor;
    this.zoneKey = zone;
    this.WorkOrderServiceService
      .getRoomtype_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
      });
    this.WorkOrderServiceService
      .getRoom_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, zone, null, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
      });
  }
  getRoom(roomtype, zone, facility, floor) {
    this.bldgKey = facility;
    this.flrKey = floor;
    this.zoneKey = zone;
    this.rTypeKey = roomtype;
    this.WorkOrderServiceService
      .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, zone, roomtype, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
      });
  }
  ngOnInit() {
    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends

    this.scheduleServ
      .getAllSchedulingNames(this.employeekey, this.OrganizationID)
      .subscribe((data: Scheduling[]) => {
        this.scheduleNameList = data;
      });

  }

}
