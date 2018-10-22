import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateinspectionComponent } from './createinspection/createinspection.component';
import { ViewinspctnbysprvsrComponent } from './viewinspctnbysprvsr/viewinspctnbysprvsr.component';
import { SupervsrinspectiontemplateComponent } from './supervsrinspectiontemplate/supervsrinspectiontemplate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateinspectionComponent, ViewinspctnbysprvsrComponent, SupervsrinspectiontemplateComponent]
})
export class SupervisorModule { }
