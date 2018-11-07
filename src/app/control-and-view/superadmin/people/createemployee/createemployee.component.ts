import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.scss']
})
export class CreateemployeeComponent implements OnInit {
  useroletypesa: People[];
  jobtitle: People[];
  organization: People[];
  department: People[];
  EmployeeNumber: Number;
  OrganizationID;
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
  OrgID;
  DepartmentKey;
  useroletype;
  roleTypeKey;
  managerList;
  showManager;
  IsSupervisor;
  employeekey;
  ManagerKey;
  name;
  role;
  marked = true;
  temp_res;

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
  constructor(private PeopleServiceService: PeopleServiceService, private router: Router) { }
  OrganizationChanged() {
    this.PeopleServiceService.getJobTitle(this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.jobtitle = data;
    });
    this.PeopleServiceService.getDepartment(this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.department = data;
    });
  }
  createEmployee() {

    if (!(this.OrganizationID)) {
      alert("Organization Not provided !");
      return;
    }
    if (!(this.EmployeeNumber)) {
      alert("Employee Number Not provided !");
      return;
    }
    if (!(this.UserRoleTypeKey)) {
      alert("User Role Type Not provided !");
      return;
    }
    if (this.showManager === true && !(this.ManagerKey)) {
      alert("Manager Not provided !");
      return;
    }
    else {
      this.ManagerKey = -1;
    }
    if (!(this.FirstName)) {
      alert("First Name Not provided !");
      return;
    }
    if (!(this.LastName)) {
      alert("LastName Not provided !");
      return;
    }
    if (!(this.Gender)) {
      alert("Gender Not provided !");
      return;
    }
    if (!(this.PrimaryPhone)) {
      alert("Primary Phone Not provided !");
      return;
    }
    if (!(this.HireDate)) {
      alert("HireDate Not provided !");
      return;
    }
    if (!(this.JobTitleKey)) {
      this.JobTitleKey = -1;
    }
    if (!(this.DepartmentKey)) {
      this.DepartmentKey = -1;
    }
    var BD;
    var currentDate = this.convert_DT(new Date());

    if (!(this.BirthDate)) {
      BD = this.convert_DT(new Date());
    }
    else {
      BD = this.convert_DT(this.BirthDate);
    }
    var HD = this.convert_DT(this.HireDate);
    if (BD > currentDate) {
      alert("Wrong BirthDate !");
      return;
    }
    if (HD > currentDate) {
      alert("Wrong HireDate !");
      return;
    }
    if (HD < BD) {
      alert("HireDate must be greater than birth date !");
      return;
    }

    var str = "";
    str = this.FirstName + '' + this.LastName;
    this.PeopleServiceService.checkEmpNumber(this.EmployeeNumber, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        if (data[0].count > 0) {
          alert("Employee Number already exists");
        }
        else {
          this.PeopleServiceService.createEmployeebySuperAdmin(this.OrganizationID, this.ManagerKey, this.EmployeeNumber, this.UserRoleTypeKey, this.FirstName, this.LastName, this.MiddleName, BD, this.Gender, this.AddressLine1, this.City, this.AddressLine2, this.State, this.Country, this.PrimaryPhone, this.ZipCode, this.AlternatePhone, this.EmailID, HD, this.theCheckbox, this.JobTitleKey, this.DepartmentKey, this.employeekey)
            .subscribe((data: any[]) => {
              this.temp_res = data;
              alert("Employee Created !");
              var empKey = this.temp_res.EmployeeKey;
              this.router.navigate(['/setUserLoginSuper', empKey, str, this.UserRoleTypeKey, this.OrganizationID]);
            });
        }
      });
  }

  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.OrganizationID = '';
    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.DepartmentKey = '';
    this.UserRoleTypeKey = '';
    this.ManagerKey = '';


    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrgID = profile.OrganizationID;
    this.PeopleServiceService
      .getUserRoleTypesa(this.OrgID)
      .subscribe((data: People[]) => {
        this.useroletypesa = data;
      });
    this.PeopleServiceService
      .getOrganization(this.OrgID)
      .subscribe((data: People[]) => {
        this.organization = data;
      });
    this.PeopleServiceService
      .getUserRoleType(this.OrgID)
      .subscribe((data: any[]) => {
        this.useroletype = data;

        for (var i = 0; i < data.length; i++) {
          if (data[i].UserRoleName == "Employee") {
            this.roleTypeKey = data[i].UserRoleTypeKey;
          }
        }

      });
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }
  }
  selectUserType(userType) {

    userType;
    if (userType == this.roleTypeKey) {
      this.showManager = true;
      this.PeopleServiceService
        .getmanagersForEmp(this.employeekey, this.OrgID)
        .subscribe((data: any[]) => {
          this.managerList = data;
        });
      console.log(this.showManager);
    } else {
      this.showManager = false;
      console.log(this.showManager);
    }
  }

}
