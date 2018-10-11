import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { Organization } from '../../../../model-class/Organization';
@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
  OrgName:String;
  OrgDesc:any;
  State:string;
  tenID:any;
  Location:any;
  Country:string;
  TenName:string;
  OrgEmail:any;
  updatedby:number;

  constructor(private organizationService: OrganizationService) { }
  
  createOrg(){
     this.updatedby=2751;
    this.organizationService.createOrganization(this.OrgName,this.OrgDesc,this.Location,this.State,this.Country,this.updatedby,this.TenName,this.OrgEmail,this.tenID);
  }

  ngOnInit() {
  }

}
