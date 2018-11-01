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
  OrgID:number;
  EmployeeNumber: Number;
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
  OrganizationID;
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
  constructor(private PeopleServiceService: PeopleServiceService,private router: Router) { }

  createEmployee(){
    debugger;
    var BD = this.convert_DT(this.BirthDate);
    var HD = this.convert_DT(this.HireDate);
    
    var str = "";
    str = this.FirstName +''+this.LastName;
    this.PeopleServiceService.createEmployeebySuperAdmin(this.OrganizationID,this.ManagerKey,this.EmployeeNumber,this.UserRoleTypeKey,this.FirstName,this.LastName,this.MiddleName,BD,this.Gender,this.AddressLine1,this.City,this.AddressLine2,this.State,this.Country,this.PrimaryPhone,this.ZipCode,this.AlternatePhone,this.EmailID,HD,this.theCheckbox,this.JobTitleKey,this.DepartmentKey).subscribe((data22:any[]) => {
      //  debugger;
          this.temp_res=data22;
          var empKey=this.temp_res.EmployeeKey;
          this.router.navigate(['/SetUsnamepaswdbySA',empKey,str,this.UserRoleTypeKey]);
        });
  }
  ngOnInit() {
    this.OrgID=21;
    this.OrganizationID = '';
    this.UserRoleTypeKey='';
    this.Gender='';
    this.JobTitleKey='';
    this.DepartmentKey='';
    this.UserRoleTypeKey='';



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
        // debugger;
        this.useroletypesa = data;
      });
    this.PeopleServiceService
      .getJobTitle()
      .subscribe((data: People[]) => {
        // debugger;
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getOrganization(this.OrgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.organization = data;
      });
    this.PeopleServiceService
      .getDepartment()
      .subscribe((data: People[]) => {
        // debugger;
        this.department = data;
      });
      this.PeopleServiceService
      .getUserRoleType()
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
