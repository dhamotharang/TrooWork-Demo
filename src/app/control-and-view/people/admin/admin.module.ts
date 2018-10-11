import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTitleViewAdminComponent } from './job-title-view-admin/job-title-view-admin.component';
import { JobTitleAddAdminComponent } from './job-title-add-admin/job-title-add-admin.component';
import { JobTitleEditAdminComponent } from './job-title-edit-admin/job-title-edit-admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobTitleViewAdminComponent, JobTitleAddAdminComponent, JobTitleEditAdminComponent]
})
export class AdminModule { }
