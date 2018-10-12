import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-Class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
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
  UserRoleTypeKey: Number;
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
  JobTitleKey: Number;
  OrganizationID: Number;
  DepartmentKey: Number;
  marked = true;
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

  constructor(private PeopleServiceService: PeopleServiceService) { }

  createEmployee(){
    debugger;
    var BD = this.convert_DT(this.BirthDate);
    var HD = this.convert_DT(this.HireDate);
    this.PeopleServiceService.createEmployeebySuperAdmin(this.OrganizationID,this.EmployeeNumber,this.UserRoleTypeKey,this.FirstName,this.LastName,this.MiddleName,BD,this.Gender,this.AddressLine1,this.City,this.AddressLine2,this.State,this.Country,this.PrimaryPhone,this.ZipCode,this.AlternatePhone,this.EmailID,HD,this.theCheckbox,this.JobTitleKey,this.DepartmentKey).subscribe(res => console.log('Done'));
  }
  ngOnInit() {
    this.OrgID=21;
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
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }
  }

}
