import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeWelcomeComponent } from './employee-welcome.component';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import{ EmployeeDashbordModule  } from '../../user-dashboards/employee-dashboard/employee-dashbord.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EmployeeWelcomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    EmployeeDashbordModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeWelcomeComponent]
})
export class EmployeeWelcomeModule { }
