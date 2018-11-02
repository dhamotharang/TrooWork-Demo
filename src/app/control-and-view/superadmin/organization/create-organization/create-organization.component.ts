import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { Organization } from '../../../../model-class/Organization';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
  OrgName: String;
  OrgDesc: any;
  State: string;
  tenID: any;
  Location: any;
  Country: string;
  TenName: string;
  OrgEmail: any;
  updatedby: number;
  role;
  IsSupervisor;
  name;
  employeekey;
  OrgID;

  constructor(private organizationService: OrganizationService,private router: Router) { }
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

  createOrg() {
    if(this.OrgName=== undefined){
      alert('Organization Name is not provided !');
      return;
    }
    this.updatedby = this.employeekey;
    this.organizationService.checkForTenantId(this.tenID).subscribe((data: any[]) => {
      if (data[0].count == 0) {
        this.organizationService.createOrganization(this.OrgName, this.OrgDesc, this.Location, this.State, this.Country, this.updatedby, this.TenName, this.OrgEmail, this.tenID).subscribe((data: any[]) => {
          this.router.navigateByUrl('/ViewOrganization');
        });
        }
      else {
        alert("Tenant ID already present !")
        return;
      }
    });
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrgID = profile.OrganizationID;
  }

}
