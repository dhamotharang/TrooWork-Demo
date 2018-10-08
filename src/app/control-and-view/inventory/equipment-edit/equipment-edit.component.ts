import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  equipKey$: Object;
  equipEditList: Inventory[];
  FloorKey: Number;
  FacKey: Number;
  equipmentType: Inventory[];
  buildings: Inventory[];
  floors: Inventory[];
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.equipKey$ = params.EquipKey);
  }

  selectFloorfromBuildings(facKey) {
    this.FacKey = facKey;
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floors = data;
      });
  }

  // updateRoomType(RoomTypeName, MetricTypeValue) {
  //   debugger;
  //   if (!this.metricType) {
  //     this.metricType = null;
  //     alert("Select a metric type !");
  //   }
  //   else if (!RoomTypeName) {
  //     RoomTypeName = null;
  //     alert("RoomTypeName is not provided !");
  //   }
  //   else if (!MetricTypeValue) {
  //     MetricTypeValue = null;
  //     alert("MetricTypeValue is not provided !");
  //   }
  //   else {
  //     this.inventoryService
  //       .getMetricValues()
  //       .subscribe((data: Inventory[]) => {
  //         this.metricTypeList = data;
  //         for (let i of this.metricTypeList) {
  //           if (i.MetricType === this.metricType) {
  //             this.metricTypeKey = i.MetricTypeKey;
  //           }
  //         }
  //         // for (var i = 0; i < data.length; i++) {
  //         //   if (data[i].MetricType == this.metricType) {
  //         //     this.metricTypeKey = data[i].MetricTypeKey;
  //         //   }
  //         // }
  //       });

  //     this.inventoryService.updateRoomType(this.rTypeKey$, this.metricTypeKey, this.metricType, RoomTypeName, MetricTypeValue)
  //       .subscribe(res => this.router.navigateByUrl('/roomTypeView'));
  //   }
  // }
  ngOnInit() {
    this.inventoryService
      .EditEquipmentAutoGenerate(this.equipKey$)
      .subscribe((data: Array<any>) => {
        this.equipEditList = data[0];
        // this.FloorKey = this.equipEditList.FacilityKey;
      });
    this.inventoryService
      .getAllEquipmentType()
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
      });

    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.buildings = data;
      });

    this.inventoryService
      .getallFloorList(this.FloorKey)
      .subscribe((data: Inventory[]) => {
        this.floors = data;
      });
  }

}
