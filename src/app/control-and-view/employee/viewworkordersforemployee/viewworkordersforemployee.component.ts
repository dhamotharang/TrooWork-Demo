import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload_test';

@Component({
  selector: 'app-viewworkordersforemployee',
  templateUrl: './viewworkordersforemployee.component.html',
  styleUrls: ['./viewworkordersforemployee.component.scss']
})
export class ViewworkordersforemployeeComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  WorkorderDetTable: workorder[];
  facilityList: workorder[];
  floorList: workorder[];
  facikey: Number;
  zoneList: workorder[];
  roomtypeList: workorder[];
  showbutton = {};
  FinishButton = [];
  RowIndex;
  countCancel1;
  myworkorder;
  countCancel;
  barcodeValue = {};
  addUrl;
  wokey: Number;
  emp: Number;
  WorkorderDate: Date;
  WorkorderDate2: Date;
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  FacilityKey;
  FloorKey;
  RoomTypeKey;
  ZoneKey;
  fileName;
  result;
  submitFlag;
  BarcodeValue;


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

  public uploader: FileUploader = new FileUploader({ url: '', itemAlias: 'photo' });
  // adding properties and methods that will be used by the igxDatePicker

  public date: Date = new Date(Date.now());
  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  }

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  constructor(private WorkOrderServiceService: WorkOrderServiceService, private formBuilder: FormBuilder, private el: ElementRef) { }

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
  checktoshowFinish(i) {
    if (this.showbutton[i] == true) {
      this.showbutton[i] = true;
    } else {
      this.showbutton[i] = false;
    }
    if (this.showbutton[i] == true) {
      this.FinishButton[i] = false; // finish has to hide
    } else {
      this.FinishButton[i] = true; // finish has to show
    }
    if (this.FinishButton[i] == false) {
      return true;
    } else {
      return false;
    }
  }

  selectFloorfromBuildings(facKey) {
    this.facikey = facKey;
    this.WorkOrderServiceService
      .getallFloorNames(facKey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorList = data;
      });
  }

  selectZoneRoomtypefromFloor(flkey) {
    this.WorkOrderServiceService
      .getallZones(this.facikey, flkey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.zoneList = data;
      });
    this.WorkOrderServiceService
      .getallRoomType(this.facikey, flkey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.roomtypeList = data;
      });
  }
  searchWO(SearchValue) {
    if (!this.WorkorderDate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.WorkorderDate);
    }
    if (!this.WorkorderDate2) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.WorkorderDate2);
    }
    if (SearchValue.length >= 3) {
      this.WorkOrderServiceService
        .SearchwoByEmployee(SearchValue, date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey).subscribe((data: any[]) => {
          this.WorkorderDetTable = data;

        });
    }
    else if (SearchValue.length == 0) {
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.WorkorderDetTable = data;
          for (var i = 0; i < this.WorkorderDetTable.length; i++) {
            this.FinishButton[i] = true;
          }
        });
    }

  }
  viewEmployeeWorkorderByFilter() {
    if (!this.WorkorderDate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.WorkorderDate);
    }
    if (!this.WorkorderDate2) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.WorkorderDate2);
    }
    this.WorkOrderServiceService
      .getworkOrderTablewithOnDateOnly(this.pageNo,this.itemsPerPage,date1, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
      });
    this.WorkOrderServiceService
      .getworkOrderTablewithOnDateandToDateFilter(date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        for (var i = 0; i < this.WorkorderDetTable.length; i++) {
          this.FinishButton[i] = true;
        }
      });
    this.WorkOrderServiceService
      .getworkOrderTablewithbuildingFilter(date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
      });

  }

  workorderCompleted(i, barcodeRequired, photoRequired, workorderkey, file) {
    this.countCancel = 1;
    this.countCancel1 = this.countCancel;

    if (this.BarcodeValue && barcodeRequired === 1) {
      this.WorkOrderServiceService
        .BarcodeRoomCheck(this.BarcodeValue, workorderkey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.result = data;
          if (this.result === 1) {
            var type = 'manual';
            this.WorkOrderServiceService
              .BarcodeRoom(this.BarcodeValue, this.toServeremployeekey, workorderkey, type, this.OrganizationID)
              .subscribe((data: any[]) => {
              });
          }
        });
    }
    if (this.fileName && photoRequired === 1) {
      this.WorkOrderServiceService
        .UpdatewobyPhotoForEmployee(this.fileName, this.toServeremployeekey, workorderkey, this.OrganizationID)
        .subscribe((data: any[]) => {
        });
    }
    if (photoRequired !== 1 && barcodeRequired !== 1) {
      this.WorkOrderServiceService
        .CompletewoByempWithoutPhotoandBarcd(this.toServeremployeekey, workorderkey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.FinishButton[i] = true;
        });
    }
    this.FinishButton[i] = true;
    this.showbutton[i] = false;
    this.submitFlag = false;
    this.countCancel1 = false;
    for (var j; j < this.FinishButton.length; j++) {

      this.FinishButton[i] = true;
      this.showbutton[i] = false;

    }
  };
  FileSelected(WorkorderKey) {
    this.addUrl = '?Workorderkey=' + WorkorderKey + '&EmployeeKey=' + this.toServeremployeekey + '&OrganizationID=' + this.OrganizationID;
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.url = URL + this.addUrl;
    }
  }
  workorderFinish(i) {
    if (this.RowIndex || this.RowIndex === 0) {
      this.showbutton[this.RowIndex] = false;
    }
    var RowIndex;
    RowIndex = i;
    this.showbutton[RowIndex] = true;
    this.FinishButton[RowIndex] = false;
    this.countCancel1 = true;
    this.submitFlag = true;
    for (var j; j < this.FinishButton.length; j++) {
      if (i !== j) {
        this.FinishButton[i] = false;
        this.showbutton[i] = false;
      }
    }
  };
  cancelWorkorderSubmission(i) {
    if (this.RowIndex || this.RowIndex === 0) {
      //                var identity1 = "showbutton";
      this.showbutton[this.RowIndex] = false;
    }
    if (this.countCancel1 == true) {
      this.countCancel1 = false;
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.WorkorderDetTable = data;
        });

    }
    this.submitFlag = false;
    this.FinishButton[i] = true;
    this.showbutton[i] = false;
  };
  ngOnInit() {

    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.toServeremployeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends

    this.FacilityKey="";
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.WorkorderDate = new Date();
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        for (var i = 0; i < this.WorkorderDetTable.length; i++) {
          this.FinishButton[i] = true;
        }
      });

    this.WorkOrderServiceService
      .getallBuildingsForEmployee(this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilityList = data;
      });

    this.searchform = this.formBuilder.group({
      SearchWO: ['', Validators.required]
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      console.log('ImageUpload:uploaded:', item, status, response);
      this.fileName = item.file.name;

      alert('File uploaded successfully');
    };
  }

}
