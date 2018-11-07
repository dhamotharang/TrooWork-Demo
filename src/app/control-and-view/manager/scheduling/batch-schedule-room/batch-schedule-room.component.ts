import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
import { Scheduling } from '../../../../model-class/Schedulng';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { Router } from "@angular/router";

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

  constructor(private scheduleServ: SchedulingService, private inventoryService: InventoryService, private router: Router) { }

  getScheduleRoomDetails(key) {
    this.BatchScheduleNameKey = key;
    this.scheduleServ
      .getSchedulingRoomList(key, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.scheduledroomList = data;
      });
    var pageno = 1;
    var itemsPerPage = 2000;
    this.scheduleServ
      .getAllOtherRoomList(key, this.OrganizationID, pageno, itemsPerPage)
      .subscribe((data: any[]) => {
        this.allroomList = data;
        for (var i = 0; i < this.allroomList.length; i++) {
          this.allroomList.roomCheck = false;
        }
      });
  }

  checkBoxValueForRoom(checkValue, roomKey) {
    debugger;
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
    debugger;
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
            this.router.navigateByUrl('/CreateBatchSchedule');
          });
      }
    }
    else {
      alert("Please select Rooms  !");
    }
    this.checkValue = [];
    this.roomsKey = [];
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

    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.building = data;
      });
    this.inventoryService
      .getallFloorTypeList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.floorType = data;
      });
  }

}
