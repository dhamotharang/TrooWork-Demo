import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { CreateemployeeComponent } from './createemployee/createemployee.component';
import { ManagelogincredentialsComponent } from './managelogincredentials/managelogincredentials.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { ResetpasswordforsamoduleComponent } from './resetpasswordforsamodule/resetpasswordforsamodule.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewemployeeComponent, CreateemployeeComponent, ManagelogincredentialsComponent, EditemployeeComponent, ResetpasswordforsamoduleComponent]
})
export class PeopleModule { }
