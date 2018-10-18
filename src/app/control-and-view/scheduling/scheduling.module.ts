import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBatchWorkComponent } from './create-batch-work/create-batch-work.component';
import { SchedulingViewComponent } from './scheduling-view/scheduling-view.component';
import { EditBatchWorkComponent } from './edit-batch-work/edit-batch-work.component';
import { CreateBatchScheduleComponent } from './create-batch-schedule/create-batch-schedule.component';
import { BatchScheduleRoomComponent } from './batch-schedule-room/batch-schedule-room.component';
import { BatchScheduleNameEditComponent } from './batch-schedule-name-edit/batch-schedule-name-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateBatchWorkComponent, SchedulingViewComponent, EditBatchWorkComponent, CreateBatchScheduleComponent, BatchScheduleRoomComponent, BatchScheduleNameEditComponent]
})
export class SchedulingModule { }
