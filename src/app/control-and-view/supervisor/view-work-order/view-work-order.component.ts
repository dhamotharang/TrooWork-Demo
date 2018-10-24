import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-view-work-order',
  templateUrl: './view-work-order.component.html',
  styleUrls: ['./view-work-order.component.scss']
})
export class ViewWorkOrderComponent implements OnInit {
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  empk: Number = 2861;
  orgid: Number = 21;
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
 barcodeValue= {};
 addUrl;

 public uploader: FileUploader = new FileUploader({url:'', itemAlias: 'photo'});
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
    debugger;
    this.facikey = facKey;
    this.WorkOrderServiceService
      .getallFloorNames(facKey, this.orgid)
      .subscribe((data: any[]) => {
        this.floorList = data;
      });
  }

  selectZoneRoomtypefromFloor(flkey) {
    this.WorkOrderServiceService
      .getallZones(this.facikey, flkey, this.orgid)
      .subscribe((data: any[]) => {
        this.zoneList = data;
      });
    this.WorkOrderServiceService
      .getallRoomType(this.facikey, flkey, this.orgid)
      .subscribe((data: any[]) => {
        this.roomtypeList = data;
      });
  }
  searchWO(SearchValue) {

  }

  
  workorderCompleted(i, barcodeRequired, photoRequired, workorderkey,file) {
  };
  workorderFinish(i) {
    if (this.RowIndex || this.RowIndex === 0) {
      this.showbutton[this.RowIndex] = false;
    }
    this.RowIndex = i;
    this.showbutton[this.RowIndex] = true;
    this.FinishButton[this.RowIndex] = true;
  };
  cancelWorkorderSubmission(i) {
    if (this.RowIndex || this.RowIndex === 0){
this.showbutton[this.RowIndex] = false;
    }
    if(this.countCancel1==1){
      this.countCancel1=0;
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
      .getWOdetailsForEmployee(curr_date, this.empk, this.orgid)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
      });
    }
    };
  ngOnInit() {

    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(curr_date, this.empk, this.orgid)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
      });

    this.WorkOrderServiceService
      .getallBuildingsForEmployee(this.empk, this.orgid)
      .subscribe((data: any[]) => {
        this.facilityList = data;
      });

    this.searchform = this.formBuilder.group({
      SearchWO: ['', Validators.required]
    });
  }

}
