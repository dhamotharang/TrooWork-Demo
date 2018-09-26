import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingViewComponent } from './building-view/building-view.component';
import { CreatebuildingComponent } from './createbuilding/createbuilding.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';

import { FloorViewComponent } from './floor-view/floor-view.component';
import { FloorCreateComponent } from './floor-create/floor-create.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';

import { ZoneViewComponent } from './zone-view/zone-view.component';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { ZoneCreateComponent } from './zone-create/zone-create.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DepartmentCreateComponent, DepartmentViewComponent, DepartmentEditComponent]
})
export class InventoryModule { }
