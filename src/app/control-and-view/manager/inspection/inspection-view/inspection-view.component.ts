import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { InspectionService } from '../../../../service/inspection.service';
import { Inspection } from '../../../../model-class/Inspection';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-inspection-view',
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./inspection-view.component.scss']
})
export class InspectionViewComponent implements OnInit {

  loading: boolean;// loading
  inspectionordertable: any;
  searchform: FormGroup;
  fromdate: Date;
  todate: Date;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  ins_Key: Number;
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
 

  //Variables for pagination

  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;

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
  // adding properties and methods that will be used by the igxDatePicker

  public date: Date = new Date(Date.now());

  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private inspectionService: InspectionService, private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

  //functions for pagination

  nextPage() {
    var curr_date = this.convert_DT(new Date());
    this.pageNo = +this.pageNo + 1;
    this.inspectionService
    .getInspectionOrderTablewithFromCurrentDateFilter(curr_date, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
    .subscribe((data: Inspection[]) => {
      this.inspectionordertable = data;
        this.pagination = +this.inspectionordertable[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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
  previousPage() {
    var curr_date = this.convert_DT(new Date());
    this.pageNo = +this.pageNo - 1;
    this.inspectionService
    .getInspectionOrderTablewithFromCurrentDateFilter(curr_date, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
    .subscribe((data: Inspection[]) => {
      this.inspectionordertable = data;
        if (this.pageNo == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  //functions for pagination 

  filteringInspectionManagerByDate() {
   
    // var fromdate = this.convert_DT(from_date);
    // var todate = this.convert_DT(to_date);
    if (this.todate && this.fromdate > this.todate) {
      this.todate = null;
      alert("Please check your Start Date!");
      return;
    }

    this.loading = true;// loading
    if (!this.fromdate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }
    this.inspectionService
      .getInspectionOrderTablewithFromDateOnly(date1, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectionordertable = data;
        // this.loading = false;// loading
      });
    this.inspectionService
      .getInspectionOrderTablewithFromDateandToDateFilter(date1, date2, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectionordertable = data;
        this.loading = false;// loading
      });

  }
  searchTL(SearchValue) {
    // var curr_date;
    if (!this.fromdate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }
    if (SearchValue.length > 2) {
      this.inspectionService
        .SearchTemplateandLocation(SearchValue, date1, date2, this.OrganizationID).subscribe((data: Inspection[]) => {
          this.inspectionordertable = data;

        });
    }
    else if (SearchValue.length == 0) {
      var curr_date = this.convert_DT(new Date());
      this.inspectionService
      .getInspectionOrderTablewithFromCurrentDateFilter(curr_date, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectionordertable = data;
        // this.loading = false;// loading
      });
    }
  }
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
    // this.loading = true;// loading
    this.fromdate = new Date();
    var curr_date = this.convert_DT(new Date());

    this.inspectionService
      .getInspectionOrderTablewithFromCurrentDateFilter(curr_date, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        this.inspectionordertable = data;
        if (this.inspectionordertable[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.inspectionordertable[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        // this.loading = false;// loading
      });
    this.searchform = this.formBuilder.group({
      SearchTL: ['', Validators.required]
    });
  }

}
