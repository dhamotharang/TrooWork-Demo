import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-meeting-training-view',
  templateUrl: './meeting-training-view.component.html',
  styleUrls: ['./meeting-training-view.component.scss']
})
export class MeetingTrainingViewComponent implements OnInit {

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  searchform: FormGroup;
  meetingTraining: People[];
  public date1: Date = new Date(Date.now());
  todayDt: String;
  jobTitle: People[];
  empList: People[];

  dropdownSettings = {};
  dropdownSettings1 = {};
  JobTitleKey = [];
  EmployeeKey = [];

  role: String;
  name: String;
  employeekey: Number;
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


  fromdate: Date;
  todate: Date;
  // filterList: People[];

  //validation starts ..... @rodney
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private peopleServ: PeopleServiceService, private el: ElementRef) { }
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

  filterMtngTrainingList() {
    debugger;

    var JobTitleString;
    if (this.JobTitleKey.length == 0) {
      JobTitleString = null;
    }
    else {
      var jobtitleList = [];
      var jobtitleListObj = this.JobTitleKey;
      if (jobtitleListObj.length > 0) {
        if (jobtitleListObj) {
          for (var j = 0; j < jobtitleListObj.length; j++) {
            jobtitleList.push(jobtitleListObj[j].JobTitleKey);
          }
        }
        JobTitleString = jobtitleList.join(',');
      }
    }

    var EmployeeKeyString;
    if (this.EmployeeKey.length == 0) {
      EmployeeKeyString = null;
    }
    else {
      var employeeKeList = [];
      var employeeKeListObj = this.EmployeeKey;
      if (employeeKeListObj.length > 0) {
        if (employeeKeListObj) {
          for (var j = 0; j < employeeKeListObj.length; j++) {
            employeeKeList.push(employeeKeListObj[j].EmployeeKey);
          }
        }
        EmployeeKeyString = employeeKeList.join(',');
      }
    }

    if (!this.fromdate) {
      var dateFrom = this.convert_DT(new Date());
    }
    else {
      dateFrom = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = dateFrom;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }

    this.peopleServ
      .viewMtngTrainingbyFilter(dateFrom, date2, JobTitleString, EmployeeKeyString, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.meetingTraining = data;
      });

  }

  searchMeetingTraining(SearchValue) {
    if (!this.fromdate) {
      var dateFrom = this.todayDt;
    }
    else {
      dateFrom = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = dateFrom;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }

    var JobTitleString;
    if (this.JobTitleKey.length == 0) {
      JobTitleString = null;
    }
    else {
      var jobtitleList = [];
      var jobtitleListObj = this.JobTitleKey;
      if (jobtitleListObj.length > 0) {
        if (jobtitleListObj) {
          for (var j = 0; j < jobtitleListObj.length; j++) {
            jobtitleList.push(jobtitleListObj[j].JobTitleKey);
          }
        }
        JobTitleString = jobtitleList.join(',');
      }
    }

    var EmployeeKeyString;
    if (this.EmployeeKey.length == 0) {
      EmployeeKeyString = null;
    }
    else {
      var employeeKeList = [];
      var employeeKeListObj = this.EmployeeKey;
      if (employeeKeListObj.length > 0) {
        if (employeeKeListObj) {
          for (var j = 0; j < employeeKeListObj.length; j++) {
            employeeKeList.push(employeeKeListObj[j].EmployeeKey);
          }
        }
        EmployeeKeyString = employeeKeList.join(',');
      }
    }

    if (SearchValue.length >= 3) {

      this.peopleServ
        .SearchmeetingTraining(dateFrom, date2, JobTitleString, EmployeeKeyString, SearchValue, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
          this.meetingTraining = data;
        });
    } else if (SearchValue.length == 0) {

      this.peopleServ
        .viewMtngTrainingbyFilter(dateFrom, date2, JobTitleString, EmployeeKeyString, this.employeekey, this.OrganizationID)
        .subscribe((data: People[]) => {
          this.meetingTraining = data;
        });
    }
  }


  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.searchform = this.formBuilder.group({
      SearchMeetingTraining: ['', Validators.required]
    });


    this.peopleServ
      .getJobTitleList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobTitle = data;
      });

    this.peopleServ
      .getallEmployeesList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.empList = data;
      });

    this.todayDt = this.convert_DT(this.date1);
    this.peopleServ
      .gettodaysMeeting(this.todayDt, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.meetingTraining = data;
      });
    // multi select starts....
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'JobTitleKey',
      textField: 'JobTitleText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'EmployeeKey',
      textField: 'EmployeeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    // multi select ends....
  }

}
