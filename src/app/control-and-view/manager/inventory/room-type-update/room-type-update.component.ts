import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-room-type-update',
  templateUrl: './room-type-update.component.html',
  styleUrls: ['./room-type-update.component.scss']
})
export class RoomTypeUpdateComponent implements OnInit {
  rTypeKey$: Object;
  metricTypeList: Inventory[];
  metricType: String;
  metricTypeKey: Number;
  roomTypeList: Array<Inventory>;

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


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.rTypeKey$ = params.RoomTypeKey);
  }


  updateRoomType(RoomTypeName, MetricTypeValue) {
    debugger;
    if (!this.metricType) {
      this.metricType = null;
      alert("Select a metric type !");
    }
    else if (!RoomTypeName) {
      RoomTypeName = null;
      alert("RoomTypeName is not provided !");
    }
    else if (!MetricTypeValue) {
      MetricTypeValue = null;
      alert("MetricTypeValue is not provided !");
    }
    else {
      this.inventoryService
        .getMetricValues(this.OrganizationID)
        .subscribe((data: Inventory[]) => {
          this.metricTypeList = data;
          for (let i of this.metricTypeList) {
            if (i.MetricType === this.metricType) {
              this.metricTypeKey = i.MetricTypeKey;
            }
          }
        });

      this.inventoryService.updateRoomType(this.rTypeKey$, this.metricTypeKey, this.metricType, RoomTypeName, MetricTypeValue, this.employeekey, this.OrganizationID)
        .subscribe(res => {
          alert("RoomType updated successfully");
          this.router.navigateByUrl('/roomTypeView');
        });
    }
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

    this.inventoryService
      .EditRoomtTypeAutoGenerate(this.rTypeKey$, this.OrganizationID)
      .subscribe((data: Array<any>) => {
        this.roomTypeList = data[0];
        debugger;
        this.metricType = data[0].MetricType;
        this.inventoryService
          .getMetricValues(this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.metricTypeList = data;
          });
      });
  }

}
