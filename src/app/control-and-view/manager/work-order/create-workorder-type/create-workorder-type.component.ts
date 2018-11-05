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
  add_WOT;
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


  constructor(private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
  }
  addWOT(WorkOrderTypeName) {
    if(!WorkOrderTypeName)
    {
      alert("please enter work-order type!");
    }else if (!WorkOrderTypeName.trim()) {
      alert("please enter work-order type!");
    }else
    {
    this.add_WOT = {
      WorkorderTypeName: WorkOrderTypeName,
      RoomTypeKey: null,
      Frequency: null,
      Repeatable: true,
      WorkorderTime: null,
      OrganizationID: this.OrganizationID,
      empkey: this.employeekey
    };
    this.WorkOrderServiceService
      .checkforWOT(WorkOrderTypeName, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        if(data[0].count!=0)
       {
        alert("work-order type already exists!");
       }
        else if (data[0].count == 0) {
          this.WorkOrderServiceService.createWOT(this.add_WOT)
            .subscribe((data: any[]) => {
              alert("work-order type created successfully");
              this.router.navigateByUrl('/WorkOrderType');
            });
        }
      });
    }
  }
}
