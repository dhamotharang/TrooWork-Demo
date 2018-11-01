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
  inspectionordertable: Inspection[];
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
  pageNo: Number = 1;
  itemsPerPage: Number = 25;

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


  filteringInspectionManagerByDate() {
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
        // debugger;
        this.inspectionordertable = data;
      });
    this.inspectionService
      .getInspectionOrderTablewithFromDateandToDateFilter(date1, date2, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        // debugger;
        this.inspectionordertable = data;
      });

  }
  searchTL(SearchValue) {
    // var curr_date;
    // debugger;
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
    var curr_date = this.convert_DT(new Date());
    this.inspectionService
      .getInspectionOrderTablewithFromCurrentDateFilter(curr_date, this.pageNo, this.itemsPerPage, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: Inspection[]) => {
        // debugger;
        this.inspectionordertable = data;
      });
    this.searchform = this.formBuilder.group({
      SearchTL: ['', Validators.required]
    });
  }

}
