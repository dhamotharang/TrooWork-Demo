import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { Organization } from '../../../../model-class/Organization';
@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent implements OnInit {
  organization:Organization[];
  delete_orgKey: number;
  updatedby:number;
  constructor(private organizationService: OrganizationService) { }
  
  deleteOrganization(){
    this.updatedby=2751;
    this.organizationService
    .DeleteOrganization(this.delete_orgKey,this.updatedby).subscribe(() => {

      this.organizationService
        .getOrganization()
        .subscribe((data: Organization[]) => {
          this.organization = data;
        });

    });
  }
  deleteOrgPass(OrganizationID){
    this.delete_orgKey = OrganizationID;
  }

  ngOnInit() {
    
    this.organizationService
    .getOrganization()
    .subscribe((data: Organization[]) => {
      this.organization = data;
    });
  }

}
