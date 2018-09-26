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
import {CalendarModule} from 'primeng/calendar';
import { Time } from '@angular/common';
import { IgxDatePickerModule } from 'igniteui-angular';

import { InspectionReportComponent } from './control-and-view/reports/inspection-report/inspection-report.component';



import { BarcodeReportComponent } from './control-and-view/reports/barcode-report/barcode-report.component';


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
    BarcodeReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule,
    IgxDatePickerModule 
   
  ],
  providers: [CreatebuildingComponent, CreatebuildingService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {   
  time:Time ; //for timepicker
}
