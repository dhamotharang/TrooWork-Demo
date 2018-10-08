import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminWelcomeComponent } from './superadmin-welcome/superadmin-welcome.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { SupervisorWelcomeComponent } from './supervisor-welcome/supervisor-welcome.component';
import { EmployeeWelcomeComponent } from './employee-welcome/employee-welcome.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmployeeDashboardComponent, SupervisorDashboardComponent, AdminDashboardComponent, SuperadminDashboardComponent, SuperadminWelcomeComponent, AdminWelcomeComponent, SupervisorWelcomeComponent, EmployeeWelcomeComponent]
})
export class DashboardModule { }
