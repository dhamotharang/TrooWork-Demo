import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { ViewOrganizationComponent } from './view-organization/view-organization.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateOrganizationComponent, ViewOrganizationComponent, EditOrganizationComponent]
})
export class OrganizationModule { }
