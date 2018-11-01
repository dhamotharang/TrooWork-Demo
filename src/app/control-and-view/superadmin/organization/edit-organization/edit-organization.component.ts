import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { Organization } from '../../../../model-class/Organization';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {

  OrgId$: Object;
  OrgDetail;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private router: Router) {
    this.route.params.subscribe(params => this.OrgId$ = params.OrganizationID);
  }
  updateOrg(OName, ODesc, state, tid, loc, country, tename, email) {
    this.organizationService.UpdateOrganizationDetails(OName, ODesc, state, tid, loc, country, tename, email, this.employeekey, this.OrgId$).subscribe(res => this.router.navigateByUrl('/ViewOrganization'));
  }
  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.organizationService.ViewOrgDetailsforedit(this.OrgId$).subscribe((data: any[]) => {
      this.OrgDetail = data;

    });
  }

}
