import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './control-and-view/dashboard/login/login.component';
import { WelcomepageComponent } from './control-and-view/dashboard/welcomepage/welcomepage.component';
import { ManagerDashBoardComponent } from './control-and-view/dashboard/manager-dash-board/manager-dash-board.component';

import { BuildingViewComponent } from './control-and-view/inventory/building-view/building-view.component';
import { CreatebuildingComponent } from './control-and-view/inventory/createbuilding/createbuilding.component';
import { BuildingEditComponent } from './control-and-view/inventory/building-edit/building-edit.component';

import { CreateEmployeeComponent } from './control-and-view/people/create-employee/create-employee.component';

import { FloorViewComponent } from './control-and-view/inventory/floor-view/floor-view.component';
import { FloorCreateComponent } from './control-and-view/inventory/floor-create/floor-create.component';
import { FloorEditComponent } from './control-and-view/inventory/floor-edit/floor-edit.component';

import { ManageLoginCredentialsComponent } from './control-and-view/people/manage-login-credentials/manage-login-credentials.component';
import { ResetPassWordComponent } from './control-and-view/people/reset-pass-word/reset-pass-word.component';
import { InspectiontemplateCreateComponent } from './control-and-view/inspection/inspectiontemplate-create/inspectiontemplate-create.component';

import { ZoneViewComponent } from './control-and-view/inventory/zone-view/zone-view.component';
import { ZoneEditComponent } from './control-and-view/inventory/zone-edit/zone-edit.component';
import { ZoneCreateComponent } from './control-and-view/inventory/zone-create/zone-create.component';

import { InspectionCreateComponent } from './control-and-view/inspection/inspection-create/inspection-create.component';
import { InspectionReportComponent } from './control-and-view/reports/inspection-report/inspection-report.component';
import { BarcodeReportComponent } from './control-and-view/reports/barcode-report/barcode-report.component';
import { DashboardReportComponent } from './control-and-view/reports/dashboard-report/dashboard-report.component';
import { WorkorderReportComponent } from './control-and-view/reports/workorder-report/workorder-report.component';

import { DepartmentCreateComponent } from './control-and-view/inventory/department-create/department-create.component';
import { DepartmentEditComponent } from './control-and-view/inventory/department-edit/department-edit.component';
import { DepartmentViewComponent } from './control-and-view/inventory/department-view/department-view.component';

import { EquipmentCreateComponent } from './control-and-view/inventory/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './control-and-view/inventory/equipment-edit/equipment-edit.component';
import { EquipmentViewComponent } from './control-and-view/inventory/equipment-view/equipment-view.component';
import { EquipmentTypeCreateComponent } from './control-and-view/inventory/equipment-type-create/equipment-type-create.component';
import { EquipmentTypeEditComponent } from './control-and-view/inventory/equipment-type-edit/equipment-type-edit.component';
import { EquipmentTypeViewComponent } from './control-and-view/inventory/equipment-type-view/equipment-type-view.component';

import { RoomViewComponent } from './control-and-view/inventory/room-view/room-view.component';
import { RoomTypeViewComponent } from './control-and-view/inventory/room-type-view/room-type-view.component';
import { RoomTypeCreateComponent } from './control-and-view/inventory/room-type-create/room-type-create.component';
import { RoomTypeUpdateComponent } from './control-and-view/inventory/room-type-update/room-type-update.component';
import { InspectiontemplateEditComponent } from './control-and-view/inspection/inspectiontemplate-edit/inspectiontemplate-edit.component';
import { FloorTypeViewComponent } from './control-and-view/inventory/floor-type-view/floor-type-view.component';
import { FloorTypeCreateComponent } from './control-and-view/inventory/floor-type-create/floor-type-create.component';
import { FloorTypeEDitComponent } from './control-and-view/inventory/floor-type-edit/floor-type-edit.component';

import { RoomCreateComponent } from './control-and-view/inventory/room-create/room-create.component';
import { RoomEditComponent } from './control-and-view/inventory/room-edit/room-edit.component';

import { InspectiontemplateandquestionsViewComponent } from './control-and-view/inspection/inspectiontemplateandquestions-view/inspectiontemplateandquestions-view.component';
import { MeetingTrainingCreateComponent } from './control-and-view/people/meeting-training-create/meeting-training-create.component';
import { MeetingTrainingEditComponent } from './control-and-view/people/meeting-training-edit/meeting-training-edit.component';
import { MeetingTrainingViewComponent } from './control-and-view/people/meeting-training-view/meeting-training-view.component';

import { EventCreateComponent } from './control-and-view/people/event-create/event-create.component';
import { EventEditComponent } from './control-and-view/people/event-edit/event-edit.component';
import { EventViewComponent } from './control-and-view/people/event-view/event-view.component';
import { InspectionViewComponent } from './control-and-view/inspection/inspection-view/inspection-view.component';
import { InspectiontemplatedetailEditComponent } from './control-and-view/inspection/inspectiontemplatedetail-edit/inspectiontemplatedetail-edit.component';
import { ViewEmployeesofEventComponent } from './control-and-view/people/view-employeesof-event/view-employeesof-event.component';
import { BatchWorkOrderReportComponent } from './control-and-view/reports/batch-work-order-report/batch-work-order-report.component';
import { CreateBatchWorkComponent } from './control-and-view/scheduling/create-batch-work/create-batch-work.component';
import { SchedulingViewComponent } from './control-and-view/scheduling/scheduling-view/scheduling-view.component';
import { EditBatchWorkComponent } from './control-and-view/scheduling/edit-batch-work/edit-batch-work.component';
import { CreateBatchScheduleComponent } from './control-and-view/scheduling/create-batch-schedule/create-batch-schedule.component';

import { SuperadminWelcomeComponent } from './control-and-view/dashboard/superadmin-welcome/superadmin-welcome.component';
import { AdminWelcomeComponent } from './control-and-view/dashboard/admin-welcome/admin-welcome.component';
import { SupervisorWelcomeComponent } from './control-and-view/dashboard/supervisor-welcome/supervisor-welcome.component';
import { EmployeeWelcomeComponent } from './control-and-view/dashboard/employee-welcome/employee-welcome.component';


import { BatchScheduleAssignmentReportComponent } from './control-and-view/reports/batch-schedule-assignment-report/batch-schedule-assignment-report.component';
import { CreateQuickOrderComponent } from './control-and-view/work-order/create-quick-order/create-quick-order.component';
import { ViewEmployeeComponent } from './control-and-view/people/view-employee/view-employee.component';
import { EditEmployeedetailsComponent } from './control-and-view/people/edit-employeedetails/edit-employeedetails.component';
import { DocumentfolderViewComponent } from './control-and-view/documents/documentfolder-view/documentfolder-view.component';
import { NewdocumentfolderCreateComponent } from './control-and-view/documents/newdocumentfolder-create/newdocumentfolder-create.component';
import { DocumentfolderEditComponent } from './control-and-view/documents/documentfolder-edit/documentfolder-edit.component';
import { DocumentsUploadComponent } from './control-and-view/documents/documents-upload/documents-upload.component';
import { ViewDocumentsComponent } from './control-and-view/documents/view-documents/view-documents.component';
import { CreateOrganizationComponent } from './control-and-view/superadmin/organization/create-organization/create-organization.component';

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
    path: 'EventCreate',
    component: EventCreateComponent
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
    path: 'EditBatchWork',
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
    path: 'DocumentfolderEdit/:FormtypeId',
    component: DocumentfolderEditComponent
  },
  {
    path: 'DocumentsUpload',
    component:DocumentsUploadComponent
  },
  {
    path:'ViewDocuments',
    component:ViewDocumentsComponent
  },
  {
    path:'CreateOrganization',
    component:CreateOrganizationComponent
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
