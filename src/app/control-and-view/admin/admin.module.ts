import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTitleViewAdminComponent } from './job-title-view-admin/job-title-view-admin.component';
import { JobTitleAddAdminComponent } from './job-title-add-admin/job-title-add-admin.component';
import { JobTitleEditAdminComponent } from './job-title-edit-admin/job-title-edit-admin.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { ManageLoginsComponent } from './manage-logins/manage-logins.component';
import { ResetPasswordsComponent } from './reset-passwords/reset-passwords.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobTitleViewAdminComponent, JobTitleAddAdminComponent, JobTitleEditAdminComponent, CreateDepartmentComponent, EditDepartmentComponent, ViewDepartmentComponent, ManageLoginsComponent, ResetPasswordsComponent]
})
export class AdminModule { }
