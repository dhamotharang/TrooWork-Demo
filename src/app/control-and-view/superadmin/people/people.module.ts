import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { CreateemployeeComponent } from './createemployee/createemployee.component';
import { ManagelogincredentialsComponent } from './managelogincredentials/managelogincredentials.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewemployeeComponent, CreateemployeeComponent, ManagelogincredentialsComponent, EditemployeeComponent]
})
export class PeopleModule { }
