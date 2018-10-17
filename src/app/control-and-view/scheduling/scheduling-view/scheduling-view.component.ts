import { Component, OnInit, HostListener, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SchedulingService } from '../../../service/scheduling.service';
@Component({
  selector: 'app-scheduling-view',
  templateUrl: './scheduling-view.component.html',
  styleUrls: ['./scheduling-view.component.scss']
})
export class SchedulingViewComponent implements OnInit {
  searchform: FormGroup;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  empName: String = null;
  scheduleList;

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


  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private el: ElementRef, private scheduleService: SchedulingService) { }
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


  searchSchedule(SearchValue) {
    if (SearchValue.length >= 3) {
      this.scheduleService
        .searchBatchScheduleName(SearchValue, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.scheduleList = data;
        });
    } else if (SearchValue.length == 0) {
      var page = 1;
      var itemsPerPage = 1000;
      this.scheduleService
        .getAllBatchScheduleNames(page, itemsPerPage, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.scheduleList = data;
        });
    }
  };

  ngOnInit() {

    this.searchform = this.formBuilder.group({
      SearchSchedule: ['', Validators.required]
    });
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
    var page = 1;
    var itemsPerPage = 1000;
    this.scheduleService
      .getAllBatchScheduleNames(page, itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.scheduleList = data;
      });

  }

}
