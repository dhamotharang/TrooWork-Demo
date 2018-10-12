import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { Login } from '../../../../model-class/login';

@Component({
  selector: 'app-supervisor-profile',
  templateUrl: './supervisor-profile.component.html',
  styleUrls: ['./supervisor-profile.component.scss']
})
export class SupervisorProfileComponent implements OnInit {
  profile: Login[];
  profile1: Login[];
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  isAuthenticated: boolean;
  ManagerName: String;

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
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }
  constructor(private loginService: LoginService) { }
  // private formBuilder: FormBuilder,, private el: ElementRef


  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.loginService
      .getUserProfileDetails(this.employeekey, this.OrganizationID)
      .subscribe((data: Login[]) => {
        this.profile = data;
      });

    this.loginService
      .getUsermanagerDetails(this.employeekey, this.OrganizationID)
      .subscribe((data: Login[]) => {
        this.profile1 = data;
        this.ManagerName=this.profile1[0].ManagerName;
      });
  }
}
