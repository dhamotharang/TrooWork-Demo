import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { SchedulingService } from '../../../../service/scheduling.service';
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  rooms: Inventory[];
  delete_roomKey: number;
  searchform: FormGroup;
  loading: boolean;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  FloorList: any;
  floorTypeList: any;
  zonelist: any;
  RoomTypeList: any;
  RoomList: any;
  bldgKey = null;
  flrKey = null;
  zoneKey = null;
  rTypeKey = null;
  rKey = null;
  flrTypeKey = null;
  allroomList;
  building: Inventory[];
  BatchScheduleNameKey: Number = 0;
  FloorKey;
  ZoneKey;
  FloorTypeKey;
  RoomTypeKey;
  RoomKey;
  FacilityKey;
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

  //validation starts ..... @rodney
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private WorkOrderServiceService: WorkOrderServiceService, private formBuilder: FormBuilder, private inventoryService: InventoryService, private el: ElementRef, private scheduleServ: SchedulingService, ) { }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

  //validation ends ..... @rodney
  previousPage() {
    this.loading=true;
    this.pageNo = +this.pageNo - 1;
    this.inventoryService
      .getRoomList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.rooms = data;
        this.loading=false;
        if (this.pageNo == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  nextPage() {
    this.loading=true;
    this.pageNo = +this.pageNo + 1;
    this.inventoryService
      .getRoomList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.rooms = data;
        this.loading=false;
        this.pagination = +this.rooms[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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

  searchRoom(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchRoom(SearchValue, this.employeekey, this.OrganizationID).subscribe((data: Inventory[]) => {
          this.rooms = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.loading = true;
      this.inventoryService
        .getRoomList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
        .subscribe((data: Inventory[]) => {
          this.rooms = data;
          this.loading = false;
          if (this.rooms[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.rooms[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  }

  deleteRoomPass(RoomKey) {
    this.delete_roomKey = RoomKey;
  }

  deleteRoom() {
    this.inventoryService
      .DeleteRoom(this.delete_roomKey, this.employeekey, this.OrganizationID).subscribe(() => {
        alert(" Room deleted succesfully");
        this.loading = true;
        this.inventoryService
          .getRoomList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.rooms = data;
            this.loading = false;
            if (this.rooms[0].totalItems > this.itemsPerPage) {
              this.showHide2 = true;
              this.showHide1 = false;
            }
            else if (this.rooms[0].totalItems <= this.itemsPerPage) {
              this.showHide2 = false;
              this.showHide1 = false;
            }
          });
      });
  }

  rooms_Filter() {
    this.loading = true;
    // console.log("rooms filter... org" + this.OrganizationID + " ..... bldg" + this.bldgKey + " ..... flr" + this.flrKey + " ..... zone" + this.zoneKey + " ..... rtype" + this.rTypeKey + " ..... room" + this.rKey + " ..... flrtype" + this.flrTypeKey + " ..... emp" + this.employeekey);
    this.inventoryService
      .getAllRoomFilterList(this.OrganizationID, this.bldgKey, this.flrKey, this.zoneKey, this.rTypeKey, this.rKey, this.flrTypeKey, this.employeekey)
      .subscribe((data: any[]) => {
        this.rooms = data;
        this.loading = false;
        this.showHide2 = false;
        this.showHide1 = false;
      });
  }

  getFloorDisp(facilityName) {
    if (!facilityName) {
      facilityName = 0;
    }
    this.bldgKey = facilityName;
    console.log("bldg..." + this.bldgKey);
    this.WorkOrderServiceService
      .getallFloor(facilityName, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.FloorList = data;
        this.FloorKey="";
      });
  }
  getZoneRoomTypeRoom(floor, facility) {
    this.bldgKey = facility;
    this.flrKey = floor;
    console.log("flr..." + floor + " ..... bldg" + facility + " ..... org" + this.OrganizationID);
    this.WorkOrderServiceService
      .getzone_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.zonelist = data;
        this.ZoneKey="";
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, null, null, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
        this.FloorTypeKey="";
      });
    this.WorkOrderServiceService
      .getroomType_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
        this.RoomTypeKey="";
      });
    this.WorkOrderServiceService
      .getRoom_facilityfloor(floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
        this.RoomKey=""
      });
  }
  getRoomTypeRoom(zone, facility, floor) {
    this.bldgKey = facility;
    this.flrKey = floor;
    this.zoneKey = zone;
    console.log("zone..." + zone + "flr ..... " + floor + " bldg..... " + facility + "org ..... " + this.OrganizationID);
    this.WorkOrderServiceService
      .getRoomtype_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomTypeList = data;
        this.RoomTypeKey="";
      });
    this.WorkOrderServiceService
      .getRoom_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
        this.RoomKey="";
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, zone, null, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
        this.FloorTypeKey="";
      });
  }
  getRoom(roomtype, zone, facility, floor) {
    this.bldgKey = facility;
    this.flrKey = floor;
    this.zoneKey = zone;
    this.rTypeKey = roomtype;
    console.log("rtype..." + roomtype + "zone ..... " + zone + "flr ..... " + floor + "bldg ..... " + facility + "org ..... " + this.OrganizationID);
    this.WorkOrderServiceService
      .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.RoomList = data;
        this.RoomKey="";
      });
    this.scheduleServ
      .getfloorType_facilityfloor(floor, facility, zone, roomtype, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorTypeList = data;
        this.FloorTypeKey="";
      });
  }


  setRoomKey(key) {
    if (!key) {
      key = null
    } else {
      this.rKey = key;
    }
  }

  setFlrTypeKey(key) {
    if (!key) {
      key = null
    } else {
      this.flrTypeKey = key;
    }
  }

  ngOnInit() {
    this.loading = true;
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.building = data;
        this.FacilityKey="";
      });

    this.inventoryService
      .getRoomList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.rooms = data;
        this.loading = false;
        if (this.rooms[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.rooms[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchRoom: ['', Validators.required]
    });
  }

}
