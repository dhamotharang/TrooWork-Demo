import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../../model-class/login';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tokenobj;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  isAuthenticated: boolean;

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
  
  loginForm: FormGroup; constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

    this.loginForm = fb.group({
      userName: ['', Validators.required],
      tenantID: ['', Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  loginFn(userName, passWord, tenantID) {
    if (!userName) {
      alert("Enter User Name");
    }
    else if (!passWord) {
      alert("Enter Password");
    } else if (!tenantID) {
      alert("Enter Tenant ID");
    }
    else {
      this.loginService
        .login(userName, passWord, tenantID)
        .subscribe((data: any[]) => {
          this.tokenobj = data;
 
          if (this.tokenobj.token == null || this.tokenobj.token == "" || data.length == 0) {
            this.isAuthenticated = false;
            window.localStorage.clear();
            window.localStorage.removeItem('employeekey');
            delete localStorage.employeekey;
            alert("Invalid login credentials. Please enter correct credentials to login...");
          } else {
            this.isAuthenticated = true;
            localStorage.setItem('token', this.tokenobj.token);
            window.sessionStorage.token = this.tokenobj.token;
            window.localStorage['token'] = this.tokenobj.token;
            var encodedProfile = this.tokenobj.token.split('.')[1];
            var profile = JSON.parse(this.url_base64_decode(encodedProfile));
            this.role = profile.role;
            this.IsSupervisor = profile.IsSupervisor;
            this.name = profile.username;
            this.employeekey = profile.employeekey;
            this.OrganizationID = profile.OrganizationID;
            console.log("login successfull");

            if (profile.role === 'SuperAdmin' && this.isAuthenticated) {
              this.router.navigateByUrl('/welcomeSuperAdmin');
            }
            else if (profile.role === 'Admin' && this.isAuthenticated) {
              this.router.navigateByUrl('/welcomeAdmin');
            }
            else if (profile.role === 'Manager' && this.isAuthenticated) {
              this.router.navigateByUrl('/welcomePage');
            }
            else if (profile.role === 'Employee' && this.IsSupervisor === 1 && this.isAuthenticated) {
              this.router.navigateByUrl('/welcomeSupervisor');
            }
            else if (profile.role === 'Employee' && this.IsSupervisor === 0 && this.isAuthenticated) {
              this.router.navigateByUrl('/welcomeEmployee');
            }
          }


        },

          res => {
            if (res.error.text === "Wrong user or password") {
              alert("Invalid login credentials. Please enter correct credentials to login...");
            }
          });
    }
  }
  ngOnInit() {
  }

}
