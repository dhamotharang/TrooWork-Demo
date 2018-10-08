import { Component, OnInit } from '@angular/core';
import { People } from '../../../model-Class/People';
import { ActivatedRoute, Router } from "@angular/router";
import { PeopleServiceService } from '../../../service/people-service.service';
@Component({
  selector: 'app-edit-employeedetails',
  templateUrl: './edit-employeedetails.component.html',
  styleUrls: ['./edit-employeedetails.component.scss']
})
export class EditEmployeedetailsComponent implements OnInit {
  marked = true;
  empNum: Array<any>;
  empNumKey$: Object;
  firstName:Array<any>;
  firstName$: Object;
  lastName:Array<any>;
  lastName$: Object;
  MiddleName:Array<any>;
  midName$: Object;
  addline1:Array<any>;
  addline1$: Object;
  PPhonenum:Array<any>;
  PPhonenum$: Object;
  email:Array<any>;
  email$: Object;
  empstatus:Array<People>;
  empstatus$:Object;
  // hireDate:Array<any>;
  // hireDate$: Object;
  // HireDate:Date;
  employeestatus:People[];
  jobt:Array<People>;
  jobt$:Object;
  jobtitle:People[];
  dept:Array<any>;
  dept$: Object;
  department:People[];
  sup:Array<People>;
  supervisor:People[];
  sup$:Object;
  gen:Array<People>;
  gen$:Object;
  
  // value:People[];
  // adding properties and methods that will be used by the igxDatePicker
public date: Date = new Date(Date.now());

private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});

public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
}
 convert_DT(str) {
  var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice( - 2),
          day = ("0" + date.getDate()).slice( - 2);
          return [date.getFullYear(), mnth, day].join("-");
  };
  constructor(private route: ActivatedRoute,private PeopleServiceService: PeopleServiceService,private router: Router) { 
    this.route.params.subscribe(params => this.empNumKey$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.firstName$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.lastName$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.midName$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.addline1$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.PPhonenum$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.email$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.empstatus$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.jobt$ = params.EmployeeKey);
    // this.route.params.subscribe(params => this.hireDate$ = params.EmployeeKey);
    this.route.params.subscribe(params => this. dept$ = params.EmployeeKey);
    this.route.params.subscribe(params => this. sup$ = params.EmployeeKey);
    this.route.params.subscribe(params => this. gen$ = params.EmployeeKey);
  }
  editEmployee(){


  }
  ngOnInit() {
    this.PeopleServiceService.EditEmployeeNumber(this.empNumKey$).subscribe((data: Array<any>) => {
      this.empNum = data[0]
    });
    this.PeopleServiceService.EditEmployeeFirstName(this.firstName$).subscribe((data: Array<any>) => {
      this.firstName = data[0];
    });
    this.PeopleServiceService.EditEmployeeLastName(this.lastName$).subscribe((data: Array<any>) => {
      this.lastName = data[0];
    });
    this.PeopleServiceService.EditEmployeeMiddleName(this.midName$).subscribe((data: Array<any>) => {
      this.MiddleName = data[0];
    });
    this.PeopleServiceService.EditEmployeeAddLine1(this.addline1$).subscribe((data: Array<any>) => {
      this.addline1 = data[0];
    });
    this.PeopleServiceService.EditEmployeePPhoneNumber(this.PPhonenum$).subscribe((data: Array<any>) => {
      this.PPhonenum = data[0];
    });
    this.PeopleServiceService.EditEmployeeEmailID(this.email$).subscribe((data: Array<any>) => {
      this.email = data[0];
    });
    this.PeopleServiceService
      .getEmployeeStatusListforDropdown()
      .subscribe((data: People[]) => {
        this.employeestatus = data;
      });
    this.PeopleServiceService.EditEmployeeStatus(this.empstatus$).subscribe((data: Array<any>) => {
      this.empstatus = data[0];
    });
    this.PeopleServiceService
      .getJobTitleListforDropdown()
      .subscribe((data: People[]) => {
        this.jobtitle = data;
      });
      this.PeopleServiceService.EditEmployeeJobTitle(this.jobt$).subscribe((data: Array<any>) => {
        this.jobt = data[0];
      });
    // var hireDate$ = this.convert_DT(this.HireDate);
    // this.PeopleServiceService.EditEmployeeHireDate(hireDate$).subscribe((data: Array<any>) => {
    //   this.hireDate = data[0];
    // });
    this.PeopleServiceService
    .getDeptListforDropdown()
    .subscribe((data: People[]) => {
      this.department = data;
    });
    this.PeopleServiceService.EditEmployeeDept(this.dept$).subscribe((data: Array<any>) => {
      this.dept = data[0];
    });
    this.PeopleServiceService
    .getSupervisorListforDropdown()
    .subscribe((data: People[]) => {
      this.supervisor = data;
    });
    this.PeopleServiceService.EditSupervisor(this.sup$).subscribe((data: Array<any>) => {
      this.sup = data[0];
    });
    this.PeopleServiceService.EditEmployeeGender(this.gen$).subscribe((data: Array<any>) => {
      this.gen = data[0];
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
