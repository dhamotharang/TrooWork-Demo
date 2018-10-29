import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-create-workorder-type',
  templateUrl: './create-workorder-type.component.html',
  styleUrls: ['./create-workorder-type.component.scss']
})
export class CreateWorkorderTypeComponent implements OnInit {
  emp_key;
  org_id;
  add_WOT;
  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }

  ngOnInit() {
  }
  addWOT(WorkOrderTypeName) {
    this.org_id = 21;
    this.emp_key = 2861;
    this.add_WOT={
      WorkorderTypeName: WorkOrderTypeName,
      RoomTypeKey: null,
      Frequency: null,
      Repeatable: true,
      WorkorderTime: null,
      OrganizationID: this.org_id,
      empkey:this.emp_key
    };
    this.WorkOrderServiceService
    .checkforWOT(WorkOrderTypeName, this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        debugger;
        if (data[0].count == 0) {
          this.WorkOrderServiceService.createWOT( this.add_WOT)
          .subscribe((data: any[]) => {
          });
        }
      });
   
}
}
