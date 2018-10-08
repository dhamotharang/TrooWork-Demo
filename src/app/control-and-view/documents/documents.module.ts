import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentfolderViewComponent } from './documentfolder-view/documentfolder-view.component';
import { NewdocumentfolderCreateComponent } from './newdocumentfolder-create/newdocumentfolder-create.component';
import { DocumentfolderEditComponent } from './documentfolder-edit/documentfolder-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DocumentfolderViewComponent, NewdocumentfolderCreateComponent, DocumentfolderEditComponent]
})
export class DocumentsModule { }
