import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {

  organization: People[];
  orgID: number = 21;
  emplokey: number = 2751;
  empk$: Object;
  editempdtailsbysa;
  useroletyp;
  manager: People[];
  department: People[];
  employeestatus: People[];
  marked = true;
  jobtitle: People[];
  BirthDate: Date;
  HireDate: Date;
  managerKey: Number = 2861;
  delete_EmpKey: Number;
  employeedetailstable: People[];
  Updatdby: Number = 2751;
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

  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.empk$ = params.EmployeeKey);
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }

  }
  deleteEmployee() {
    debugger;

    this.PeopleServiceService
      .DeleteEmployeeDetailsbySuperadmin(this.delete_EmpKey, this.orgID, this.Updatdby).subscribe(res => this.router.navigateByUrl('/Viewemployee'));
  }
  deleteEmpPass(empk$) {
    this.delete_EmpKey = empk$;
    debugger;
  }
  editEmployee(OrganizationID, UserRoleTypeKey, EmployeeNumber, ManagerKey, FirstName, LastName, MiddleName, BD, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, HD, IsSupervisor, JobTitleKey, DepartmentKey, Gender) {
    var birthdt = this.convert_DT(BD);
    var hiredt = this.convert_DT(HD);

    this.PeopleServiceService.UpdateEmployeeDetailsbySa(this.managerKey, this.empk$, this.orgID, UserRoleTypeKey, EmployeeNumber, FirstName, LastName, MiddleName, birthdt, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, JobTitleKey, DepartmentKey, Gender)
      .subscribe(res => this.router.navigateByUrl('/Viewemployee'));

  }
  ngOnInit() {

    this.PeopleServiceService.EditEmployeeDetailsbySuperadmin(this.empk$, this.orgID).subscribe((data: Array<any>) => {
      this.editempdtailsbysa = data[0];
      this.BirthDate = new Date(this.editempdtailsbysa.BirthDate);
      this.HireDate = new Date(this.editempdtailsbysa.HireDate);

    });

    this.PeopleServiceService
      .getOrganizationDDforSuprAdmin(this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.organization = data;
      });
    this.PeopleServiceService
      .getUserRoleTypesa(this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.useroletyp = data;
      });
    this.PeopleServiceService
      .getvaluesForManagerDropdowninSA(this.emplokey, this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.manager = data;
      });
    this.PeopleServiceService
      .getDepartmentforddinSuperadmin(this.emplokey, this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.department = data;
      });
    this.PeopleServiceService
      .getEmployeeStatusListforDropdowninSuperadmin(this.emplokey, this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.employeestatus = data;
      });
    this.PeopleServiceService
      .getjobTitleforDropdowninSuperadmin(this.orgID)
      .subscribe((data: People[]) => {
        // debugger;
        this.jobtitle = data;
      });
  }

}
