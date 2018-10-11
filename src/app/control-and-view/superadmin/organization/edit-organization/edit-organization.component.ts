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
  updatedby:number;
  constructor(private route: ActivatedRoute,private organizationService: OrganizationService,private router: Router) {
    this.route.params.subscribe(params => this.OrgId$ = params.OrganizationID);
   }
   updateOrg(OName,ODesc,state,tid,loc,country,tename,email){
    this.updatedby=2751;
    this.organizationService.UpdateOrganizationDetails(OName,ODesc,state,tid,loc,country,tename,email,this.updatedby,this.OrgId$).subscribe(res => this.router.navigateByUrl('/ViewOrganization'));
   }
  ngOnInit() {
    this.organizationService.ViewOrgDetailsforedit(this.OrgId$).subscribe((data:any[]) => {
      this.OrgDetail = data;
      
    });
  }

}
