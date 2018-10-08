import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
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
        .getMetricValues()
        .subscribe((data: Inventory[]) => {
          this.metricTypeList = data;
          for (let i of this.metricTypeList) {
            if (i.MetricType === this.metricType) {
              this.metricTypeKey = i.MetricTypeKey;
            }
          }
          // for (var i = 0; i < data.length; i++) {
          //   if (data[i].MetricType == this.metricType) {
          //     this.metricTypeKey = data[i].MetricTypeKey;
          //   }
          // }
        });

      this.inventoryService.updateRoomType(this.rTypeKey$, this.metricTypeKey, this.metricType, RoomTypeName, MetricTypeValue)
        .subscribe(res => this.router.navigateByUrl('/roomTypeView'));
    }
  }
  ngOnInit() {
    this.inventoryService
      .EditRoomtTypeAutoGenerate(this.rTypeKey$)
      .subscribe((data: Array<any>) => {
        this.roomTypeList = data[0];
        this.metricType = data[0].MetricType;
      });
  }

}
