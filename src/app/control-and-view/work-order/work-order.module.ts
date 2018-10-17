import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuickOrderComponent } from './create-quick-order/create-quick-order.component';
import { ViewWorkOrdersComponent } from './view-work-orders/view-work-orders.component';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { EditWorkOrderComponent } from './edit-work-order/edit-work-order.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateQuickOrderComponent, ViewWorkOrdersComponent, CreateWorkorderComponent, EditWorkOrderComponent]
})
export class WorkOrderModule { }
