import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload_test';

@Component({
  selector: 'app-view-work-order',
  templateUrl: './view-work-order.component.html',
  styleUrls: ['./view-work-order.component.scss']
})
export class ViewWorkOrderComponent implements OnInit {

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
  FinishButton = {};
  RowIndex;
  countCancel1;
  myworkorder = {};
  countCancel;
  barcodeValue = {};
  addUrl;
  wokey: Number;
  emp: Number;
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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
    //debugger;
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
        // debugger;
        this.zoneList = data;
      });
    this.WorkOrderServiceService
      .getallRoomType(this.facikey, flkey, this.OrganizationID)
      .subscribe((data: any[]) => {
        // debugger;
        this.roomtypeList = data;
      });
  }
  searchWO(SearchValue) {
    
  }


  workorderCompleted(i, barcodeRequired, photoRequired, workorderkey, file) {
    //            debugger;

    this.countCancel = 1;
    this.countCancel1 = this.countCancel;
    // //        console.log(" file is selected or not 1" + $scope.up.file);
    // //                console.log(" file is selected or not 1" + $scope.file);
    // //                console.log(" file is selected or not 1" + $scope.up.file);
    // //                console.log(" file is selected or not 1" + $scope.file);
    //         if (this.myworkorder.barcodeValue && barcodeRequired === 1)
    //          {
    // //   // this.myworkorder.BarcodeValue = null;
    // //   //         $scope.clickToOpen("Barcode is not provided !");
    // //   //         return;
    //          }

    // if (this.myworkorder.barcodeValue && barcodeRequired === 1) {
    //   this.myworkorder.BarcodeValue = this.myworkorder.barcodeValue;
    //   this.addUrl='?barcode=' + this.myworkorder.BarcodeValue + "&wkey=" +  workorderkey +"&OrganizationID="+this.OrganizationID;
    //    this.uploader.onBeforeUploadItem = (item) => {
    //    item.withCredentials = false;
    //    item.url = URL + this.addUrl;

    //           // $http.get(ControllerURL + "/barcodeRoom_check?barcode=" + this.myworkorder.BarcodeValue + "&wkey=" + workorderkey+ "&OrganizationID="+this.OrganizationID)
    //           // .success(function(response) {
    //           // if (response.message == "Failed to authenticate token.") {
    //           // $rootScope.clickToOpen1("Please Re-Login to continue !");
    //           // }
    //           this.result = response;
    //                   if (this.result === "1") {
    //           var type = 'manual';
    //                   barcodeRoomService.barcodeRoom(this.myworkorder.BarcodeValue, this.toServeremployeekey, workorderkey, type,this.OrganizationID).then(function(response) {

    //           // if (response.message == "Failed to authenticate token.") {
    //           // $rootScope.clickToOpen1("Please Re-Login to continue !");
    //           // }
    //               if(this.ShowWithoutFilter == false){
    //                 this.viewEmployeeWorkorderByFilter(this.viewworkorder);
    //               }
    //               else{
    //                 var curr_date = this.convert_DT(new Date());
    //                 this.WorkOrderServiceService
    //                 .getWOdetailsForEmployee(curr_date, this.toServeremployeekey, this.OrganizationID)
    //                 .subscribe((data: any[]) => {
    //                   this.WorkorderDetTable = data;
    //                 });
    //               }

    //           var statusFlag = response.WorkorderStatus;
    //                   if (statusFlag === 'Completed') {
    //           this.completionTime = 10;
    //           this.workorderkey = workorderkey;
    // //                        $scope.clickToOpenPopupforWorkordercompletion("Workorder completion time: ");


    //           }
    //           this.myworkorder.BarcodeValue = null;
    //           });
    //           }
    //           // else if (this.result === "0") {
    //           // $scope.clickToOpen("You are trying with Invalid room ID ! Please try again!!");
    //           //         return;
    //           // }

    //           });
    //   }

    //   // if (!file && photoRequired === 1) {
    //   //   this.myworkorder.Fname = null;
    //   //         $scope.clickToOpen("Photo is not provided !");
    //   //         return;
    //   // }
    //   if (file && photoRequired === 1) {
    //   $http.get(ControllerURL + "/updateWorkorderByPhoto?pho=" + file.name + "&employeekey=" + this.toServeremployeekey + "&wkey=" + workorderkey+"&OrganizationID="+this.OrganizationID)
    //           .success(function(response) {
    // //                    debugger;
    //                  if(this.ShowWithoutFilter == false){
    //                   this.viewEmployeeWorkorderByFilter(this.viewworkorder);
    //               }
    //               else{
    //                 var curr_date = this.convert_DT(new Date());
    //                 this.WorkOrderServiceService
    //                 .getWOdetailsForEmployee(curr_date, this.toServeremployeekey, this.OrganizationID)
    //                 .subscribe((data: any[]) => {
    //                   this.WorkorderDetTable = data;
    //                 });
    //               }
    //           // var statusFlag = response.WorkorderStatus;
    //           //         if (statusFlag === 'Completed') {
    //           // $scope.completionTime = 10;
    //           //         $scope.workorderkey = workorderkey;
    // //                        $scope.clickToOpenPopupforWorkordercompletion("Workorder completion time: ");

    //                   // $scope.viewWorkorderFilterByDate();
    //           // }
    //           });
    // //                var statusFlag = response.WorkorderStatus;


    //   }

    //   if (photoRequired !== 1 && barcodeRequired !== 1) {
    //   $http.get(ControllerURL + "/workCompleted?employeekey=" + this.toServeremployeekey + "&wkey=" + workorderkey+"&OrganizationID="+this.OrganizationID)
    //           .success(function(response) {
    //           //Author:Rodney starts here
    //           // if (response.message == "Failed to authenticate token.") {
    //           // $rootScope.clickToOpen1("Please Re-Login to continue !");
    //           // }
    //           //Author:Rodney ends here
    //           console.log(response);
    //           this.completionTime = 10;
    //                   this.workorderkey = workorderkey;
    // //                        $scope.clickToOpenPopupforWorkordercompletion("Workorder completion time: ");
    //                   if(this.ShowWithoutFilter == false){
    //                     this.viewEmployeeWorkorderByFilter(this.viewworkorder);
    //               }
    //               else{
    //                 var curr_date = this.convert_DT(new Date());
    //                 this.WorkOrderServiceService
    //                 .getWOdetailsForEmployee(curr_date, this.toServeremployeekey, this.OrganizationID)
    //                 .subscribe((data: any[]) => {
    //                   this.WorkorderDetTable = data;
    //                 });
    //               }
    //           });
    //   }
    //  this.myworkorder.barcodeValue = null;
    this.showbutton[this.RowIndex] = false;
  };
  FileSelected() {
    this.addUrl = '?Workorderkey=' + this.wokey + '&EmployeeKey=' + this.emp;
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.url = URL + this.addUrl;

    }
  }
  workorderFinish(i) {
    debugger;
    if (this.RowIndex || this.RowIndex === 0) {
      this.showbutton[this.RowIndex] = false;
    }
    var RowIndex;
    RowIndex = i;
    this.showbutton[RowIndex] = true;
    this.FinishButton[RowIndex] = false;
    this.countCancel1 = true;
  };
  cancelWorkorderSubmission(i) {
    debugger;
    if (this.RowIndex || this.RowIndex === 0) {
      //                var identity1 = "showbutton";
      this.showbutton[this.RowIndex] = false;
    }
    if (this.countCancel1 == true) {
      this.countCancel1 = false;
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getWOdetailsForEmployee(curr_date, this.toServeremployeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.WorkorderDetTable = data;
        });
    }
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
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(curr_date, this.toServeremployeekey, this.OrganizationID)
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
      alert('File uploaded successfully');
    };
  }

}
