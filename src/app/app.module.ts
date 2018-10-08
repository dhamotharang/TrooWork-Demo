import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

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
import { CreatebuildingService } from './service/createbuilding.service';
import { CalendarModule } from 'primeng/calendar';
import { Time } from '@angular/common';
import { IgxDatePickerModule } from 'igniteui-angular';
import { InspectionReportComponent } from './control-and-view/reports/inspection-report/inspection-report.component';
import { DashboardReportComponent } from './control-and-view/reports/dashboard-report/dashboard-report.component';
import { GooglePieChartService } from './extra-files/piechart-file/Services/google-pie-chart.service';
import { PieChartComponent } from './extra-files/piechart-file/Dashboard/Charts/piechart.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { BarcodeReportComponent } from './control-and-view/reports/barcode-report/barcode-report.component';
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
import { InspectionViewComponent } from './control-and-view/inspection/inspection-view/inspection-view.component';
import { EventCreateComponent } from './control-and-view/people/event-create/event-create.component';
import { EventEditComponent } from './control-and-view/people/event-edit/event-edit.component';
import { EventViewComponent } from './control-and-view/people/event-view/event-view.component';
import { InspectiontemplatedetailEditComponent } from './control-and-view/inspection/inspectiontemplatedetail-edit/inspectiontemplatedetail-edit.component';
import { BatchWorkOrderReportComponent } from './control-and-view/reports/batch-work-order-report/batch-work-order-report.component';
import { BatchScheduleAssignmentReportComponent } from './control-and-view/reports/batch-schedule-assignment-report/batch-schedule-assignment-report.component';
import {DataTableModule} from 'angular5-data-table';
import { ViewEmployeesofEventComponent } from './control-and-view/people/view-employeesof-event/view-employeesof-event.component';

import { CreateBatchWorkComponent } from './control-and-view/scheduling/create-batch-work/create-batch-work.component';
import { SchedulingViewComponent } from './control-and-view/scheduling/scheduling-view/scheduling-view.component';
import { EditBatchWorkComponent } from './control-and-view/scheduling/edit-batch-work/edit-batch-work.component';
import { CreateBatchScheduleComponent } from './control-and-view/scheduling/create-batch-schedule/create-batch-schedule.component';
import { CreateQuickOrderComponent } from './control-and-view/work-order/create-quick-order/create-quick-order.component';
import { ViewEmployeeComponent } from './control-and-view/people/view-employee/view-employee.component';
import { EditEmployeedetailsComponent } from './control-and-view/people/edit-employeedetails/edit-employeedetails.component';
import { DocumentfolderViewComponent } from './control-and-view/documents/documentfolder-view/documentfolder-view.component';
import { NewdocumentfolderCreateComponent } from './control-and-view/documents/newdocumentfolder-create/newdocumentfolder-create.component';
import { DocumentfolderEditComponent } from './control-and-view/documents/documentfolder-edit/documentfolder-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomepageComponent,
    BuildingViewComponent,
    ManagerDashBoardComponent,
    CreatebuildingComponent,
    BuildingEditComponent,
    CreateEmployeeComponent,
    FloorViewComponent,
    FloorCreateComponent,
    FloorEditComponent,
    ManageLoginCredentialsComponent,
    ResetPassWordComponent,
    ZoneViewComponent,
    ZoneEditComponent,
    ZoneCreateComponent,
    InspectionCreateComponent,
    InspectiontemplateCreateComponent,
    InspectionReportComponent,
    BarcodeReportComponent,
    DashboardReportComponent,
    PieChartComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    DepartmentViewComponent,
    EquipmentCreateComponent,
    EquipmentEditComponent,
    EquipmentViewComponent,
    EquipmentTypeCreateComponent,
    EquipmentTypeEditComponent,
    EquipmentTypeViewComponent,
    RoomViewComponent,
    RoomTypeViewComponent,
    RoomTypeCreateComponent,
    RoomTypeUpdateComponent,
    FloorTypeViewComponent,
    FloorTypeCreateComponent,
    FloorTypeEDitComponent,
    RoomCreateComponent,
    InspectiontemplateandquestionsViewComponent,
    InspectiontemplateEditComponent,
    RoomEditComponent,
    MeetingTrainingCreateComponent,
    MeetingTrainingEditComponent,
    MeetingTrainingViewComponent,
    EventCreateComponent,
    EventEditComponent,
    EventViewComponent,
    WorkorderReportComponent,
    InspectiontemplatedetailEditComponent,
    ViewEmployeesofEventComponent,
    BatchWorkOrderReportComponent,
    InspectionViewComponent,
    CreateBatchWorkComponent,
    SchedulingViewComponent,
    EditBatchWorkComponent,
    CreateBatchScheduleComponent,
    BatchScheduleAssignmentReportComponent,
    CreateQuickOrderComponent,
    ViewEmployeeComponent,
    EditEmployeedetailsComponent,
    DocumentfolderViewComponent,
    NewdocumentfolderCreateComponent,
    DocumentfolderEditComponent
   
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule,
    IgxDatePickerModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [CreatebuildingComponent, CreatebuildingService, GooglePieChartService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
  time: Time; //for timepicker
}
