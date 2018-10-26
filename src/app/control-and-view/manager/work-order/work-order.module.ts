import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuickOrderComponent } from './create-quick-order/create-quick-order.component';
import { ViewWorkOrdersComponent } from './view-work-orders/view-work-orders.component';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { EditWorkOrderComponent } from './edit-work-order/edit-work-order.component';
import { UpdateRecurWorkorderComponent } from './update-recur-workorder/update-recur-workorder.component';
import { CreateBatchWorkorderComponent } from './create-batch-workorder/create-batch-workorder.component';
import { ViewBatchWorkorderComponent } from './view-batch-workorder/view-batch-workorder.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateQuickOrderComponent, ViewWorkOrdersComponent, CreateWorkorderComponent, EditWorkOrderComponent, UpdateRecurWorkorderComponent, CreateBatchWorkorderComponent, ViewBatchWorkorderComponent]
})
export class WorkOrderModule { }
