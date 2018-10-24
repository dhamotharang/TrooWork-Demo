import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-create-batch-work',
  templateUrl: './create-batch-work.component.html',
  styleUrls: ['./create-batch-work.component.scss']
})
export class CreateBatchWorkComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  empName: String = null;
  empList;
  empKey: Number;
  scheduleName;
  scheduleDescription;

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

  constructor(private scheduleService: SchedulingService, private router: Router) { }

  setEmployeeForbatchSchedule(key) {
    this.empKey = key;
  }

  createScheduleName() {
    debugger;
    if (!this.scheduleName) {
      alert("BatchSchduleName is not provided !");
    } else if (!this.scheduleDescription) {
      alert("ScheduleDescription is not provided!");
    }
    else if (!this.empKey) {
      alert("Employee Name is not provided !");
    }
    else {
      this.scheduleService
        .checkScheduleName(this.scheduleName, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          if (data[0].count > 0) {
            alert("Schedule Name already present");
          }
          else if (data[0].count == 0) {
            this.scheduleService.addScheduleName(this.scheduleName, this.empKey, this.scheduleDescription, this.employeekey, this.OrganizationID)
              .subscribe(res => this.router.navigateByUrl('/SchedulingView'));
          }
        });
    }
  }
  ngOnInit() {

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

    this.scheduleService
      .getAllEmpList(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.empList = data;
      });
  }

}
