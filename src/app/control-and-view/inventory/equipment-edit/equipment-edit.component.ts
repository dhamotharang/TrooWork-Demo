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
  equipTypeKey: Number;
  dept: Inventory[];

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
  setEquipmentTypeKey(equipmentTypeKey) {
    this.equipTypeKey = equipmentTypeKey;
  }
  floorValueSet(floorKey) {
    this.FloorKey = floorKey;
  }
  updateEquipment(EquipmentName, EquipmentDescription, EquipmentBarcode, ) {
    if (!this.equipTypeKey) {
      alert("Equipment Type is not provided");
    } else if (!EquipmentName) {
      alert("Equipment Name is not provided");
    } else if (!EquipmentBarcode) {
      alert("Equipment Barcode is not provided");
    } else if (!this.FacKey) {
      alert("Building is not provided");
    } else if (!this.FloorKey) {
      alert("Floor is not provided");
    } else {
      this.inventoryService.checkForNewEquipment(this.equipTypeKey, EquipmentName).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (this.dept[0].count > 0) {
          alert("Equipment already present");
        }
        else if (this.dept[0].count == 0) {
          this.inventoryService.updateEquipment(EquipmentName, EquipmentDescription, EquipmentBarcode, this.equipTypeKey, this.FacKey, this.FloorKey,this.equipKey$)
            .subscribe(res => this.router.navigateByUrl('/EquipmentView'));
        }
      });
    }
  }
  ngOnInit() {
    // debugger;
    this.inventoryService
      .EditEquipmentAutoGenerate(this.equipKey$)
      .subscribe((data: Inventory[]) => {
        this.equipEditList = data;
        this.FacKey = data[0].FacilityKey;
        this.equipTypeKey=data[0].EquipmentTypeKey;
        console.log("...  facKey:" + this.FacKey);
        this.inventoryService
          .getallFloorList(data[0].FacilityKey)
          .subscribe((data: Inventory[]) => {
            this.floors = data;
            this.FloorKey = data[0].FloorKey;
          });
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
    // debugger;

  }

}
