import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';
import { BarcodeReportComponent } from './barcode-report/barcode-report.component';
import { DashboardReportComponent } from './dashboard-report/dashboard-report.component';
import { WorkorderReportComponent } from './workorder-report/workorder-report.component';
import { BatchWorkOrderReportComponent } from './batch-work-order-report/batch-work-order-report.component';
import { BatchScheduleAssignmentReportComponent } from './batch-schedule-assignment-report/batch-schedule-assignment-report.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InspectionReportComponent,BarcodeReportComponent, DashboardReportComponent, WorkorderReportComponent, BatchWorkOrderReportComponent, BatchScheduleAssignmentReportComponent]
})
export class ReportsModule { }
