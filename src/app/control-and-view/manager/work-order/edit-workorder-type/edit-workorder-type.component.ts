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

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  WOT_Key;
  workorderTypeList: workorder[];
  update_WO;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) {
    this.route.params.subscribe(params => this.WOT_Key = params.WorkorderTypeKey);
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.WorkOrderServiceService
      .Edit_WOT(this.WOT_Key, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
  }
  updateWOT(WOTName, WOTKey) {
    if(!WOTName)
    {
      alert("please enter work-order type!");
    }else if (!WOTName.trim()) {
      alert("please enter work-order type!");
    }else
    {
    this.update_WO = {
      WorkorderTypeKey: WOTKey,
      WorkorderTypeName: WOTName,
      RoomTypeKey: null,
      Frequency: null,
      Repeatable: true,
      WorkorderTime: null,
      OrganizationID: this.OrganizationID
    };
    this.WorkOrderServiceService
      .checkforWOT(WOTName, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
       if(data[0].count!=0)
       {
        alert("work-order type already exists!");
       }
        else if (data[0].count == 0) {
          this.WorkOrderServiceService
            .UpdateWOT(this.update_WO)
            .subscribe((data: any[]) => {
              alert("work-order type updated successfully");
              this.router.navigateByUrl('/WorkOrderType');
            });
        }
      });
    }
  }
}
