import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import {  SupervsrinspectiontemplateModule } from '../../../supervisor/supervsrinspectiontemplate/supervsrinspectiontemplate.module';
const routes: Routes = [
  {
    path: 'SupervisorDashboard',
    component: SupervisorDashboardComponent,
    children: [
      {
        path: 'Supervisor_welcomePage',
        outlet: 'Superout',
        loadChildren: '../../user-welcome-pages/supervisor-welcome/supervisor-welcome.module#SupervisorWelcomeModule',
      },
      {
        path: 'createQuickOrderSuperVisor',
        outlet: 'Superout',
        loadChildren: '../../../supervisor/create-quick-work-order/create-quick-work-order.module#CreateQuickWorkOrderModule',
      },
      {
        path: 'CreateWorkOrderSuperVisor',
        outlet: 'Superout',
        loadChildren: '../../../supervisor/create-work-order/create-work-order.module#CreateWorkOrderModule',
      },
      {
        path: 'Createinspectionbysuprvsr',
        outlet: 'Superout',
        loadChildren: '../../../supervisor/createinspection/createinspection.module#CreateinspectionModule',
      },
      {
        path: 'viewWorkOrderSupervisor',
        outlet: 'Superout',
        loadChildren:'../../../supervisor/view-work-order/view-work-order.module#ViewWorkOrderModule',
      },
      {
        path: 'Viewinspctnbysprvsr',
        outlet: 'Superout',
        loadChildren:'../../../supervisor/viewinspctnbysprvsr/viewinspctnbysprvsr.module#ViewinspctnbysprvsrModule',
      },
      {
        path: 'Viewinspctnbysprvsr/Supervsrinspectiontemplate/:InspectionOrderKey',
        outlet: 'Superout',
        loadChildren:'../../../supervisor/supervsrinspectiontemplate/supervsrinspectiontemplate.module#SupervsrinspectiontemplateModule',
      },
      {
        path: 'Training',
        outlet: 'Superout',
        loadChildren:'../../../supervisor/training/training.module#TrainingModule',
      },
      {
        path: 'supervisorMyProfile',
        outlet: 'Superout',
        loadChildren:'../../../dashboard/user-profiles/supervisor-profile/supervisor-profile.module#SupervisorProfileModule',
      },
      {
        path: 'supervisorMyProfile/changePasswordSupervisor/:EmployeeKey/:UserRoleName/:IsSupervisor',
        outlet: 'Superout',
        loadChildren:'../../../dashboard/user-password-changes/supervisor-change-password/supervisor-change-password.module#SupervisorChangePasswordModule',
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SupervisorDashboardComponent],
  exports:[SupervisorDashboardComponent]
})
export class SupervisorDashboardModule { }
