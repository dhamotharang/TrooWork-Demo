import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionCreateComponent } from './inspection-create/inspection-create.component';
import { InspectiontemplateCreateComponent } from './inspectiontemplate-create/inspectiontemplate-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InspectionCreateComponent, InspectiontemplateCreateComponent]
})
export class InspectionModule { }
