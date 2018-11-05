import { Component, OnInit,Input } from '@angular/core';
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
  BirthDate;
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
  HireDate;
  theCheckbox: any;
  JobTitleKey;
  SupervisorKey;
  DepartmentKey;
  temp_res;

  minDate;
  maxDate;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID;

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
    if (!(this.EmployeeNumber) ) {
      alert("Employee Number Not provided !");
      return;
    }
    if (!(this.UserRoleTypeKey ) ) {
      alert("User Role Type Not provided !");
      return;
    }

    if (!(this.FirstName ) ) {
      alert("First Name Not provided !");
      return;
    }
    if (!(this.LastName ) ) {
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
    if (!(this.JobTitleKey ) ) {
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
    var str = "";
    str = this.FirstName + '' + this.LastName;
    this.PeopleServiceService.checkEmpNumber(this.EmployeeNumber, this.employeekey, this.OrganizationID).subscribe((data: any[]) => {
      if (data[0].count == 0) {
        this.PeopleServiceService.createEmployeebyManager(this.EmployeeNumber, this.UserRoleTypeKey, this.FirstName, this.LastName, this.MiddleName, BD, this.Gender, this.AddressLine1, this.City, this.AddressLine2, this.State, this.Country, this.PrimaryPhone, this.ZipCode, this.AlternatePhone, this.EmailID, HD, this.theCheckbox, this.JobTitleKey, this.SupervisorKey, this.DepartmentKey, this.employeekey, this.OrganizationID).subscribe((data22: any[]) => {
          //  debugger;
          this.temp_res = data22;
          alert("Employee Created !");
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
 
    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.DepartmentKey = '';
    this.UserRoleTypeKey = '';
    
    this.minDate= new Date();
    this.maxDate=new Date();
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
