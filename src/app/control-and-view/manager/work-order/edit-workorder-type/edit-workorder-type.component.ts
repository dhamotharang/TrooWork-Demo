import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-workorder-type',
  templateUrl: './edit-workorder-type.component.html',
  styleUrls: ['./edit-workorder-type.component.scss']
})
export class EditWorkorderTypeComponent implements OnInit {

  WOT_Key;
  workorderTypeList: workorder[];
  emp_key;
  org_id;
  update_WO;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) {
    this.route.params.subscribe(params => this.WOT_Key = params.WorkorderTypeKey);
  }

  ngOnInit() {
    this.org_id = 21;
    this.emp_key = 2861;
    this.WorkOrderServiceService
      .Edit_WOT(this.WOT_Key, this.org_id)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
  }
  updateWOT(WOTName, WOTKey) {
    this.update_WO = {
      WorkorderTypeKey: WOTKey,
      WorkorderTypeName: WOTName,
      RoomTypeKey: null,
      Frequency: null,
      Repeatable: true,
      WorkorderTime: null,
      OrganizationID: this.org_id
    };
    this.WorkOrderServiceService
      .checkforWOT(WOTName, this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        debugger;
        if (data[0].count == 0) {
          this.WorkOrderServiceService
            .UpdateWOT(this.update_WO)
            .subscribe((data: any[]) => {
            });
        }
      });

  }
}
