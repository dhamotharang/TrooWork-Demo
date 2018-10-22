import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkOrderComponent } from './create-work-order/create-work-order.component';
import { CreateQuickWorkOrderComponent } from './create-quick-work-order/create-quick-work-order.component';
import { ViewWorkOrderComponent } from './view-work-order/view-work-order.component';
import { TrainingComponent } from './training/training.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateWorkOrderComponent, CreateQuickWorkOrderComponent, ViewWorkOrderComponent, TrainingComponent]
})
export class SupervisorModule { }
