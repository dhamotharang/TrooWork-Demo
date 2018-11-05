import { Component, OnInit } from '@angular/core';
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  marked = true;
  showManager = false;
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
  managerList;
  ManagerKey;
  roleTypeKey = 0;

  role: String;
  name: String;
  employeekey;
  IsSupervisor;
  OrganizationID;
  

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
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) { }

  createEmployee() {
    debugger;
    
    if (!(this.EmployeeNumber) ) {
      alert("Employee Number Not provided !");
      return;
    }
    if (!(this.UserRoleTypeKey) ) {
      alert("User Role Type Not provided !");
      return;
    }
    if (this.showManager === true && !(this.ManagerKey) ) {
      alert("Manager Not provided !");
      return;
    }
    else {
      this.ManagerKey = -1;
    }
    if (!(this.FirstName )) {
      alert("First Name Not provided !");
      return;
    }
    if (!(this.LastName) ) {
      alert("LastName Not provided !");
      return;
    }
    if (!(this.Gender) ) {
      alert("Gender Not provided !");
      return;
    }
    if (!(this.PrimaryPhone) ) {
      alert("Primary Phone Not provided !");
      return;
    }
    if (!(this.HireDate) ) {
      alert("HireDate Not provided !");
      return;
    }
    if (!(this.JobTitleKey) ) {
      alert("JobTitle Not provided !");
      return;
    }
    if (!(this.DepartmentKey) ) {
      alert("Department Not provided !");
      return;
    }
    var BD;
    var currentDate=this.convert_DT(new Date());
   
    if (!(this.BirthDate) ) {
      BD = this.convert_DT(new Date());
    }
    else {
      BD = this.convert_DT(this.BirthDate);
    }
    var HD = this.convert_DT(this.HireDate);
    if(BD > currentDate){
      alert("Wrong BirthDate !");
      return;
    }
    if(HD >currentDate){
      alert("Wrong HireDate !");
      return;
    }
    if( HD <BD){
      alert("HireDate must be greater than birth date !");
      return;
    }

      this.PeopleServiceService.checkEmpNumber(this.EmployeeNumber, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          if (data[0].count > 0) {
            alert("Employee Number already exists");
          }
          else {
           
            var str = "";
            str = this.FirstName + '' + this.LastName;
            this.PeopleServiceService.createEmployeebyAdmin(this.EmployeeNumber, this.ManagerKey, this.FirstName, this.LastName, this.MiddleName, BD, this.Gender,
              this.AddressLine1, this.City, this.AddressLine2, this.State, this.Country, this.PrimaryPhone, this.ZipCode, this.AlternatePhone, this.EmailID, HD, this.theCheckbox,
              this.JobTitleKey, this.DepartmentKey, this.employeekey, this.OrganizationID)
              .subscribe((data22: any[]) => {
                this.temp_res = data22;
                alert("Employee Created !");
                var empKey = this.temp_res.EmployeeKey;
                this.router.navigate(['/setUserLoginAdmin', empKey, str, this.UserRoleTypeKey]);
              });
          }
        });
    
  }
  ngOnInit() {

    this.OrganizationID = '';
    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.DepartmentKey = '';
    this.UserRoleTypeKey = '';
    this.ManagerKey='';

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.PeopleServiceService
      .getUserRoleType(this.OrganizationID)
      .subscribe((data: any[]) => {
        this.useroletype = data;

        for (var i = 0; i < data.length; i++) {
          if (data[i].UserRoleName == "Employee") {
            this.roleTypeKey = data[i].UserRoleTypeKey;
          }
        }

      });
    this.PeopleServiceService
      .getJobTitle(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getSuperVisor(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.supervisor = data;
      });
    this.PeopleServiceService
      .getDepartment(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.department = data;
      });
  }
  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any){
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }
  selectUserType(userType) {
    debugger;
    userType;
    if (userType == this.roleTypeKey) {
      this.showManager = true;
      this.PeopleServiceService
        .getmanagersForEmp(this.employeekey, this.OrganizationID)
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
