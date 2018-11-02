import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  marked = true;
  useroletype: People[];
  jobtitle: People[];
  supervisor: People[];
  department: People[];
  EmployeeNumber;
  UserRoleTypeKey;
  FirstName: String;
  LastName: String;
  MiddleName: String;
  BirthDate: Date;
  Gender: String;
  AddressLine1: any;
  City: String;
  AddressLine2: any;
  State: String;
  Country: String;
  PrimaryPhone: any;
  ZipCode: any;
  AlternatePhone: any;
  EmailID: any;
  HireDate: Date;
  theCheckbox: any;
  JobTitleKey;
  SupervisorKey;
  DepartmentKey;
  temp_res;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());

  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) { }
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

  createEmployee() {
    debugger;
    if (this.EmployeeNumber === undefined) {
      alert("Employee Number Not provided !");
      return;
    }
    if (this.UserRoleTypeKey === undefined) {
      alert("User Role Type Not provided !");
      return;
    }

    if (this.FirstName === undefined) {
      alert("First Name Not provided !");
      return;
    }
    if (this.LastName === undefined) {
      alert("LastName Not provided !");
      return;
    }
    if (this.Gender === undefined) {
      alert("Gender Not provided !");
      return;
    }
    if (this.PrimaryPhone === undefined) {
      alert("Primary Phone Not provided !");
      return;
    }
    if (this.HireDate === undefined) {
      alert("HireDate Not provided !");
      return;
    }
    if (this.JobTitleKey === undefined) {
      this.JobTitleKey = -1;
    }
    if (this.DepartmentKey === undefined) {
      this.DepartmentKey = -1;
    }
    var BD;
    if (this.BirthDate === undefined) {
      BD = new Date();
    }
    else {
      BD = this.convert_DT(this.BirthDate);
    }
    var HD = this.convert_DT(this.HireDate);
    var str = "";
    str = this.FirstName + '' + this.LastName;
    this.PeopleServiceService.checkEmpNumber(this.EmployeeNumber, this.employeekey, this.OrganizationID).subscribe((data: any[]) => {
      if (data[0].count == 0) {
        this.PeopleServiceService.createEmployeebyManager(this.EmployeeNumber, this.UserRoleTypeKey, this.FirstName, this.LastName, this.MiddleName, BD, this.Gender, this.AddressLine1, this.City, this.AddressLine2, this.State, this.Country, this.PrimaryPhone, this.ZipCode, this.AlternatePhone, this.EmailID, HD, this.theCheckbox, this.JobTitleKey, this.SupervisorKey, this.DepartmentKey, this.employeekey, this.OrganizationID).subscribe((data22: any[]) => {
          //  debugger;
          this.temp_res = data22;
          var empKey = this.temp_res.EmployeeKey;
          this.router.navigate(['/Settingusernameandpswrdaftremplcreatebyman', empKey, str, this.UserRoleTypeKey]);
        });
      } else {
        alert('Employee number already present!');
        return;
      }
    });
  }
  ngOnInit() {
    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.SupervisorKey = '';
    this.DepartmentKey = '';

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    // this.role = profile.role;
    // this.IsSupervisor = profile.IsSupervisor;
    // this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.PeopleServiceService
      .getUserRoleType(this.OrganizationID)
      .subscribe((data: People[]) => {
        // debugger;
        this.useroletype = data;
      });
    this.PeopleServiceService
      .getJobTitle(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        // debugger;
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getSuperVisor(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        // debugger;
        this.supervisor = data;
      });
    this.PeopleServiceService
      .getDepartment(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        // debugger;
        this.department = data;
      });
  }

  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }
    // this.marked = e.target.checked;
  }
}
