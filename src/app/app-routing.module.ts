import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './control-and-view/dashboard/login/login.component';
import { WelcomepageComponent } from './control-and-view/dashboard/user-welcome-pages/welcomepage/welcomepage.component';
import { ManagerDashBoardComponent } from './control-and-view/dashboard/user-dashboards/manager-dash-board/manager-dash-board.component';

import { BuildingViewComponent } from './control-and-view/manager/inventory/building-view/building-view.component';
import { CreatebuildingComponent } from './control-and-view/manager/inventory/createbuilding/createbuilding.component';
import { BuildingEditComponent } from './control-and-view/manager/inventory/building-edit/building-edit.component';

import { CreateEmployeeComponent } from './control-and-view/manager/people/create-employee/create-employee.component';

import { FloorViewComponent } from './control-and-view/manager/inventory/floor-view/floor-view.component';
import { FloorCreateComponent } from './control-and-view/manager/inventory/floor-create/floor-create.component';
import { FloorEditComponent } from './control-and-view/manager/inventory/floor-edit/floor-edit.component';

import { ManageLoginCredentialsComponent } from './control-and-view/manager/people/manage-login-credentials/manage-login-credentials.component';
import { ResetPassWordComponent } from './control-and-view/manager/people/reset-pass-word/reset-pass-word.component';
import { InspectiontemplateCreateComponent } from './control-and-view/manager/inspection/inspectiontemplate-create/inspectiontemplate-create.component';

import { ZoneViewComponent } from './control-and-view/manager/inventory/zone-view/zone-view.component';
import { ZoneEditComponent } from './control-and-view/manager/inventory/zone-edit/zone-edit.component';
import { ZoneCreateComponent } from './control-and-view/manager/inventory/zone-create/zone-create.component';

import { InspectionCreateComponent } from './control-and-view/manager/inspection/inspection-create/inspection-create.component';
import { InspectionReportComponent } from './control-and-view/manager/reports/inspection-report/inspection-report.component';
import { BarcodeReportComponent } from './control-and-view/manager/reports/barcode-report/barcode-report.component';
import { DashboardReportComponent } from './control-and-view/manager/reports/dashboard-report/dashboard-report.component';
import { WorkorderReportComponent } from './control-and-view/manager/reports/workorder-report/workorder-report.component';

import { DepartmentCreateComponent } from './control-and-view/manager/inventory/department-create/department-create.component';
import { DepartmentEditComponent } from './control-and-view/manager/inventory/department-edit/department-edit.component';
import { DepartmentViewComponent } from './control-and-view/manager/inventory/department-view/department-view.component';

import { EquipmentCreateComponent } from './control-and-view/manager/inventory/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './control-and-view/manager/inventory/equipment-edit/equipment-edit.component';
import { EquipmentViewComponent } from './control-and-view/manager/inventory/equipment-view/equipment-view.component';
import { EquipmentTypeCreateComponent } from './control-and-view/manager/inventory/equipment-type-create/equipment-type-create.component';
import { EquipmentTypeEditComponent } from './control-and-view/manager/inventory/equipment-type-edit/equipment-type-edit.component';
import { EquipmentTypeViewComponent } from './control-and-view/manager/inventory/equipment-type-view/equipment-type-view.component';

import { RoomViewComponent } from './control-and-view/manager/inventory/room-view/room-view.component';
import { RoomTypeViewComponent } from './control-and-view/manager/inventory/room-type-view/room-type-view.component';
import { RoomTypeCreateComponent } from './control-and-view/manager/inventory/room-type-create/room-type-create.component';
import { RoomTypeUpdateComponent } from './control-and-view/manager/inventory/room-type-update/room-type-update.component';
import { InspectiontemplateEditComponent } from './control-and-view/manager/inspection/inspectiontemplate-edit/inspectiontemplate-edit.component';
import { FloorTypeViewComponent } from './control-and-view/manager/inventory/floor-type-view/floor-type-view.component';
import { FloorTypeCreateComponent } from './control-and-view/manager/inventory/floor-type-create/floor-type-create.component';
import { FloorTypeEDitComponent } from './control-and-view/manager/inventory/floor-type-edit/floor-type-edit.component';

import { RoomCreateComponent } from './control-and-view/manager/inventory/room-create/room-create.component';
import { RoomEditComponent } from './control-and-view/manager/inventory/room-edit/room-edit.component';

import { InspectiontemplateandquestionsViewComponent } from './control-and-view/manager/inspection/inspectiontemplateandquestions-view/inspectiontemplateandquestions-view.component';
import { MeetingTrainingCreateComponent } from './control-and-view/manager/people/meeting-training-create/meeting-training-create.component';
import { MeetingTrainingEditComponent } from './control-and-view/manager/people/meeting-training-edit/meeting-training-edit.component';
import { MeetingTrainingViewComponent } from './control-and-view/manager/people/meeting-training-view/meeting-training-view.component';

import { EventEditComponent } from './control-and-view/manager/people/event-edit/event-edit.component';
import { EventViewComponent } from './control-and-view/manager/people/event-view/event-view.component';
import { InspectionViewComponent } from './control-and-view/manager/inspection/inspection-view/inspection-view.component';
import { InspectiontemplatedetailEditComponent } from './control-and-view/manager/inspection/inspectiontemplatedetail-edit/inspectiontemplatedetail-edit.component';
import { ViewEmployeesofEventComponent } from './control-and-view/manager/people/view-employeesof-event/view-employeesof-event.component';
import { BatchWorkOrderReportComponent } from './control-and-view/manager/reports/batch-work-order-report/batch-work-order-report.component';
import { CreateBatchWorkComponent } from './control-and-view/manager/scheduling/create-batch-work/create-batch-work.component';
import { SchedulingViewComponent } from './control-and-view/manager/scheduling/scheduling-view/scheduling-view.component';
import { EditBatchWorkComponent } from './control-and-view/manager/scheduling/edit-batch-work/edit-batch-work.component';
import { CreateBatchScheduleComponent } from './control-and-view/manager/scheduling/create-batch-schedule/create-batch-schedule.component';

import { SuperadminWelcomeComponent } from './control-and-view/dashboard/user-welcome-pages/superadmin-welcome/superadmin-welcome.component';
import { AdminWelcomeComponent } from './control-and-view/dashboard/user-welcome-pages/admin-welcome/admin-welcome.component';
import { SupervisorWelcomeComponent } from './control-and-view/dashboard/user-welcome-pages/supervisor-welcome/supervisor-welcome.component';
import { EmployeeWelcomeComponent } from './control-and-view/dashboard/user-welcome-pages/employee-welcome/employee-welcome.component';
import { ViewWorkOrdersComponent } from './control-and-view/manager/work-order/view-work-orders/view-work-orders.component';

import { BatchScheduleAssignmentReportComponent } from './control-and-view/manager/reports/batch-schedule-assignment-report/batch-schedule-assignment-report.component';
import { CreateQuickOrderComponent } from './control-and-view/manager/work-order/create-quick-order/create-quick-order.component';
import { ViewEmployeeComponent } from './control-and-view/manager/people/view-employee/view-employee.component';
import { EditEmployeedetailsComponent } from './control-and-view/manager/people/edit-employeedetails/edit-employeedetails.component';
import { DocumentfolderViewComponent } from './control-and-view/manager/documents/documentfolder-view/documentfolder-view.component';
import { NewdocumentfolderCreateComponent } from './control-and-view/manager/documents/newdocumentfolder-create/newdocumentfolder-create.component';
import { DocumentfolderEditComponent } from './control-and-view/manager/documents/documentfolder-edit/documentfolder-edit.component';
import { ManagerMyprofileComponent } from './control-and-view/dashboard/user-profiles/manager-myprofile/manager-myprofile.component';
import { DocumentsUploadComponent } from './control-and-view/manager/documents/documents-upload/documents-upload.component';
import { ViewDocumentsComponent } from './control-and-view/manager/documents/view-documents/view-documents.component';
import { ManagerChangePassWordComponent } from './control-and-view/dashboard/user-password-changes/manager-change-pass-word/manager-change-pass-word.component';
import { SuperadminProfileComponent } from './control-and-view/dashboard/user-profiles/superadmin-profile/superadmin-profile.component';
import { SupeadminChangePasswordComponent } from './control-and-view/dashboard/user-password-changes/supeadmin-change-password/supeadmin-change-password.component';
import { AdminProfileComponent } from './control-and-view/dashboard/user-profiles/admin-profile/admin-profile.component';
import { SupervisorProfileComponent } from './control-and-view/dashboard/user-profiles/supervisor-profile/supervisor-profile.component';
import { EmployeeProfileComponent } from './control-and-view/dashboard/user-profiles/employee-profile/employee-profile.component';
import { AdminChangePasswordComponent } from './control-and-view/dashboard/user-password-changes/admin-change-password/admin-change-password.component';
import { EmployeeChangePasswordComponent } from './control-and-view/dashboard/user-password-changes/employee-change-password/employee-change-password.component';
import { SupervisorChangePasswordComponent } from './control-and-view/dashboard/user-password-changes/supervisor-change-password/supervisor-change-password.component';
import { JobTitleViewComponent } from './control-and-view/manager/people/job-title-view/job-title-view.component';
import { JobTitleAddComponent } from './control-and-view/manager/people/job-title-add/job-title-add.component';
import { JobTitleEditComponent } from './control-and-view/manager/people/job-title-edit/job-title-edit.component';
import { JobTitleViewAdminComponent } from './control-and-view/admin/job-title-view-admin/job-title-view-admin.component';
import { JobTitleAddAdminComponent } from './control-and-view/admin/job-title-add-admin/job-title-add-admin.component';
import { JobTitleEditAdminComponent } from './control-and-view/admin/job-title-edit-admin/job-title-edit-admin.component';

import { CreateWorkorderComponent } from './control-and-view/manager/work-order/create-workorder/create-workorder.component';
import { CreateOrganizationComponent } from './control-and-view/superadmin/organization/create-organization/create-organization.component';
import { ViewOrganizationComponent } from './control-and-view/superadmin/organization/view-organization/view-organization.component';
import { EditOrganizationComponent } from './control-and-view/superadmin/organization/edit-organization/edit-organization.component';
import { CreateemployeeComponent } from './control-and-view/superadmin/people/createemployee/createemployee.component';
import { ViewemployeeComponent } from './control-and-view/superadmin/people/viewemployee/viewemployee.component';
import { ManagelogincredentialsComponent } from './control-and-view/superadmin/people/managelogincredentials/managelogincredentials.component';
import { EditemployeeComponent } from './control-and-view/superadmin/people/editemployee/editemployee.component';
import { ViewmeetingortrainingeventComponent } from './control-and-view/employee/viewmeetingortrainingevent/viewmeetingortrainingevent.component';
import { ResetpasswordforsamoduleComponent } from './control-and-view/superadmin/people/resetpasswordforsamodule/resetpasswordforsamodule.component';
import { SettingusernameandpswrdaftremplcreatebymanComponent } from './control-and-view/manager/people/settingusernameandpswrdaftremplcreatebyman/settingusernameandpswrdaftremplcreatebyman.component';
import { ViewworkordersforemployeeComponent } from './control-and-view/employee/viewworkordersforemployee/viewworkordersforemployee.component';
import { ViewinspectionmanagerComponent } from './control-and-view/manager/inspection/viewinspectionmanager/viewinspectionmanager.component';
import { EditWorkOrderComponent } from './control-and-view/manager/work-order/edit-work-order/edit-work-order.component';
import { TrainingComponent } from './control-and-view/supervisor/training/training.component';
import { ManagerinspectiontemplateComponent } from './control-and-view/manager/inspection/managerinspectiontemplate/managerinspectiontemplate.component';
import { UpdateRecurWorkorderComponent } from './control-and-view/manager/work-order/update-recur-workorder/update-recur-workorder.component';
import { CreateinspectionComponent } from './control-and-view/supervisor/createinspection/createinspection.component';
import { ViewinspctnbysprvsrComponent } from './control-and-view/supervisor/viewinspctnbysprvsr/viewinspctnbysprvsr.component';
import { SupervsrinspectiontemplateComponent } from './control-and-view/supervisor/supervsrinspectiontemplate/supervsrinspectiontemplate.component';

import { BatchScheduleRoomComponent } from './control-and-view/manager/scheduling/batch-schedule-room/batch-schedule-room.component';
import { CreateWorkOrderComponent } from './control-and-view/supervisor/create-work-order/create-work-order.component';
import { CreateQuickWorkOrderComponent } from './control-and-view/supervisor/create-quick-work-order/create-quick-work-order.component';
import { ViewWorkOrderComponent } from './control-and-view/supervisor/view-work-order/view-work-order.component';

import { CreateDepartmentComponent } from './control-and-view/admin/create-department/create-department.component';
import { EditDepartmentComponent } from './control-and-view/admin/edit-department/edit-department.component';
import { ViewDepartmentComponent } from './control-and-view/admin/view-department/view-department.component';
import { ManageLoginsComponent } from './control-and-view/admin/manage-logins/manage-logins.component';
import { ResetPasswordsComponent } from './control-and-view/admin/reset-passwords/reset-passwords.component';
import { AddEmployeeComponent } from './control-and-view/admin/add-employee/add-employee.component';
import { SetLoginCredentialsForUserComponent } from './control-and-view/admin/set-login-credentials-for-user/set-login-credentials-for-user.component';
import { ViewEmployeeAdminComponent } from './control-and-view/admin/view-employee-admin/view-employee-admin.component';
import { EditEmployeeDetailsAdminComponent } from './control-and-view/admin/edit-employee-details-admin/edit-employee-details-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'welcomePage',
    component: WelcomepageComponent
  },
  {
    path: 'Buildview',
    component: BuildingViewComponent
  },
  {
    path: 'Createbuilding',
    component: CreatebuildingComponent
  },
  {
    path: 'Buildedit/:Facility_Key',
    component: BuildingEditComponent
  },
  {
    path: 'addEmployee',
    component: CreateEmployeeComponent
  },
  {

    path: 'Floorview',
    component: FloorViewComponent
  },
  {
    path: 'Createfloor',
    component: FloorCreateComponent
  },
  {
    path: 'Flooredit/:Floor_Key/:Facility_Key',
    component: FloorEditComponent
  },

  {
    path: 'manageLoginCredentials',
    component: ManageLoginCredentialsComponent
  },
  {
    path: 'resetPassword/:EmpKey',
    component: ResetPassWordComponent
  },
  {
    path: 'Zoneview',
    component: ZoneViewComponent
  },
  {
    path: 'Zonedit/:Floor_Key/:Facility_Key/:Zone_Key',
    component: ZoneEditComponent
  },
  {
    path: 'Createzone',
    component: ZoneCreateComponent
  },
  {
    path: 'Inspection-Report',
    component: InspectionReportComponent
  },
  {
    path: 'BarcodeReport',
    component: BarcodeReportComponent

  },
  {
    path: 'WorkorderReport',
    component: WorkorderReportComponent
  },
  {
    path: 'InspectionCreate',
    component: InspectionCreateComponent
  },
  {
    path: 'CreateInspectionTemplate',
    component: InspectiontemplateCreateComponent
  },
  {
    path: 'Dashboard-Report',
    component: DashboardReportComponent
  },
  {
    path: 'createDepartment',
    component: DepartmentCreateComponent
  },
  {
    path: 'departmentEdit/:DeptKey',
    component: DepartmentEditComponent
  },
  {
    path: 'DepartmentView',
    component: DepartmentViewComponent
  },
  {
    path: 'EquipmentView',
    component: EquipmentViewComponent
  },
  {
    path: 'EquipmentCreate',
    component: EquipmentCreateComponent
  },
  {
    path: 'EquipmentEdit/:EquipKey',
    component: EquipmentEditComponent
  },
  {
    path: 'EquipmentTypeCreate',
    component: EquipmentTypeCreateComponent
  },
  {
    path: 'EquipmentTypeView',
    component: EquipmentTypeViewComponent
  },
  {
    path: 'EquipmentTypeEdit/:EquipTypeKey',
    component: EquipmentTypeEditComponent
  },
  {
    path: 'roomView',
    component: RoomViewComponent
  },
  {
    path: 'roomTypeView',
    component: RoomTypeViewComponent
  },
  {
    path: 'roomTypeCreate',
    component: RoomTypeCreateComponent
  },
  {
    path: 'roomTypeEdit/:RoomTypeKey',
    component: RoomTypeUpdateComponent
  },
  {
    path: 'FloorTypeView',
    component: FloorTypeViewComponent
  },
  {
    path: 'FloorTypeCreate',
    component: FloorTypeCreateComponent
  },
  {
    path: 'FloorTypeEdit/:FloorTypeKey',
    component: FloorTypeEDitComponent
  },
  {
    path: 'roomCreate',
    component: RoomCreateComponent
  },
  {
    path: 'InspectiontemplateandquestionsView',
    component: InspectiontemplateandquestionsViewComponent
  },
  {
    path: 'InspectiontemplateEdit',
    component: InspectiontemplateEditComponent
  },
  {
    path: 'RoomEdit/:RoomKey',
    component: RoomEditComponent
  },
  {
    path: 'MeetingTrainingCreate',
    component: MeetingTrainingCreateComponent
  },
  {
    path: 'MeetingTrainingEdit/:EventKey/:ActionKey',
    component: MeetingTrainingEditComponent
  },
  {
    path: 'MeetingTrainingView',
    component: MeetingTrainingViewComponent
  },
  {
    path: 'EventEdit/:ActionKey/:ActionTypeKey',
    component: EventEditComponent
  },
  {
    path: 'EventView',
    component: EventViewComponent
  },
  {
    path: 'InspectiontemplatedetailEdit/:TemplateID',
    component: InspectiontemplatedetailEditComponent
  },
  {
    path: 'viewEventEmployees/:EventKey',
    component: ViewEmployeesofEventComponent
  },
  {
    path: 'Batch-work-order-Report',
    component: BatchWorkOrderReportComponent
  },
  {
    path: 'InspectionView',
    component: InspectionViewComponent
  },
  {
    path: 'CreateBatchWork',
    component: CreateBatchWorkComponent
  },
  {
    path: 'SchedulingView',
    component: SchedulingViewComponent
  },
  {
    path: 'EditBatchWork/:scheduleNameKey',
    component: EditBatchWorkComponent
  },
  {
    path: 'CreateBatchSchedule',
    component: CreateBatchScheduleComponent
  },
  {
    path: 'welcomeEmployee',
    component: EmployeeWelcomeComponent
  },
  {
    path: 'welcomeAdmin',
    component: AdminWelcomeComponent
  },
  {
    path: 'welcomeSuperAdmin',
    component: SuperadminWelcomeComponent
  },
  {
    path: 'welcomeSupervisor',
    component: SupervisorWelcomeComponent
  },
  {
    path: 'BatchScheduleAssignment',
    component: BatchScheduleAssignmentReportComponent
  },
  {
    path: 'createQuickOrder',
    component: CreateQuickOrderComponent
  },
  {
    path: 'ViewEmployee',
    component: ViewEmployeeComponent
  },
  {
    path: 'EditEmployeedetails/:EmployeeKey',
    component: EditEmployeedetailsComponent
  },
  {
    path: 'DocumentfolderView',
    component: DocumentfolderViewComponent
  },
  {
    path: 'NewdocumentfolderCreate',
    component: NewdocumentfolderCreateComponent
  },

  {
    path: 'ViewWorkOrder',
    component: ViewWorkOrdersComponent
  },
  {
    path: 'DocumentfolderEdit/:FormtypeId',
    component: DocumentfolderEditComponent
  },
  {
    path: 'managerMyProfile',
    component: ManagerMyprofileComponent
  },
  {
    path: 'DocumentsUpload',
    component: DocumentsUploadComponent
  },
  {
    path: 'ViewDocuments',
    component: ViewDocumentsComponent
  },
  {
    path: 'changePasswordManager/:EmployeeKey/:UserRoleName/:IsSupervisor',
    component: ManagerChangePassWordComponent
  },
  {
    path: 'superAdminMyProfile',
    component: SuperadminProfileComponent
  },
  {
    path: 'changePasswordSuperAdmin/:EmployeeKey/:UserRoleName/:IsSupervisor',
    component: SupeadminChangePasswordComponent
  },
  {
    path: 'adminMyProfile',
    component: AdminProfileComponent
  },
  {
    path: 'supervisorMyProfile',
    component: SupervisorProfileComponent
  },
  {
    path: 'employeeMyProfile',
    component: EmployeeProfileComponent
  },
  {
    path: 'changePasswordAdmin/:EmployeeKey/:UserRoleName/:IsSupervisor',
    component: AdminChangePasswordComponent
  },
  {
    path: 'changePasswordSupervisor/:EmployeeKey/:UserRoleName/:IsSupervisor',
    component: SupervisorChangePasswordComponent
  },
  {
    path: 'changePasswordEmployee/:EmployeeKey/:UserRoleName/:IsSupervisor',
    component: EmployeeChangePasswordComponent
  },
  {

    path: 'JobTitleView',
    component: JobTitleViewComponent
  },
  {
    path: 'JobTitleAdd',
    component: JobTitleAddComponent
  },
  {
    path: 'JobTitleEdit/:JobTitle_Key',
    component: JobTitleEditComponent
  },
  {

    path: 'JobTitleViewAdmin',
    component: JobTitleViewAdminComponent
  },
  {
    path: 'JobTitleAddAdmin',
    component: JobTitleAddAdminComponent
  },
  {
    path: 'JobTitleEditAdmin/:JobTitle_Key',
    component: JobTitleEditAdminComponent
  },
  {
    path: 'ViewDocuments',
    component: ViewDocumentsComponent
  },
  {
    path: 'CreateWorkOrder',
    component: CreateWorkorderComponent
  },
  {
    path: 'CreateOrganization',
    component: CreateOrganizationComponent
  },
  {
    path: 'ViewOrganization',
    component: ViewOrganizationComponent
  },
  {
    path: 'Orgedit/:OrganizationID',
    component: EditOrganizationComponent
  },
  {
    path: 'Createemployee',
    component: CreateemployeeComponent
  },
  {
    path: 'Viewemployee',
    component: ViewemployeeComponent
  },
  {
    path: 'Managelogincredentials',
    component: ManagelogincredentialsComponent
  },
  {
    path: 'Editemployee/:EmployeeKey',
    component: EditemployeeComponent
  },
  {
    path: 'Viewmeetingortrainingevent',
    component: ViewmeetingortrainingeventComponent
  },
  {
    path: 'Resetpasswordforsamodule/:EmpKey',
    component: ResetpasswordforsamoduleComponent
  },
  {
    path: 'Settingusernameandpswrdaftremplcreatebyman/:EmployeeKey/:str',
    component: SettingusernameandpswrdaftremplcreatebymanComponent
  },
  {
    path: 'Viewworkordersforemployee',
    component: ViewworkordersforemployeeComponent
  },
  {
    path: 'EditWorkOrder/:WorkorderKey',
    component: EditWorkOrderComponent
  },
  {
    path: 'scheduleRoomView',
    component: BatchScheduleRoomComponent
  },
  {
    path: 'ViewInspectionManager/:InspectionOrderKey',
    component: ViewinspectionmanagerComponent
  },
  {
    path: 'EditWorkOrder/:WorkorderKey',
    component: EditWorkOrderComponent
  },
  {
    path: 'Managerinspectiontemplate/:InspectionOrderKey',
    component: ManagerinspectiontemplateComponent
  },
  {
    path: 'Createinspectionbysuprvsr',
    component: CreateinspectionComponent
  },
  {
    path: 'Viewinspctnbysprvsr',
    component: ViewinspctnbysprvsrComponent
  },
  {
    path: 'Supervsrinspectiontemplate/:InspectionOrderKey',
    component: SupervsrinspectiontemplateComponent
  },
  {
    path: 'EditWorkOrder/:WorkorderKey',
    component: EditWorkOrderComponent
  },
  {
    path: 'Training',
    component: TrainingComponent
  },
  {
    path: 'Managerinspectiontemplate/:InspectionOrderKey',
    component: ManagerinspectiontemplateComponent
  },
  {
    path: 'UpdateRecurWorkorder/:WorkorderKey',
    component: UpdateRecurWorkorderComponent
  },
  {
    path: 'CreateWorkOrderSuperVisor',
    component: CreateWorkOrderComponent
  },
  {
    path: 'createQuickOrderSuperVisor',
    component: CreateQuickWorkOrderComponent
  },
  {
    path: 'viewWorkOrderSupervisor',
    component: ViewWorkOrderComponent
  },
  {
    path: 'DepartmentCreate',
    component: CreateDepartmentComponent
  },
  {
    path: 'EditDepartment/:DeptKey',
    component: EditDepartmentComponent
  },
  {
    path: 'ViewDepartment',
    component: ViewDepartmentComponent
  },
  {
    path: 'manageLoginCreds',
    component: ManageLoginsComponent
  },
  {
    path: 'resetPasswords/:EmpKey',
    component: ResetPasswordsComponent
  },
  {
    path: 'addEmployeeAdmin',
    component: AddEmployeeComponent
  },
  {
    path: 'setUserLoginAdmin/:EmployeeKey/:str/:UserRoleTypeKey',
    component: SetLoginCredentialsForUserComponent
  },
  {
    path: 'viewEmployeeAdmin',
    component: ViewEmployeeAdminComponent
  },
  {
    path: 'editEmpDetailsAdmin/:EmployeeKey',
    component: EditEmployeeDetailsAdminComponent
  }
];


@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
