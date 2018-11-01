import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../../model-class/Inventory';
import { InventoryService } from '../../../../service/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {
  dept: Inventory[];
  equipmentType: Inventory[];
  buildings: Inventory[];
  floors: Inventory[];
  FacKey: Number;
  EquipmentTypeDescription: String;
  barcode: Array<Inventory>;
  FloorKey: Number;
  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private router: Router) {

  }

  selectFloorfromBuildings(facKey) {
    this.FacKey = facKey;
    this.inventoryService
      .getallFloorList(facKey)
      .subscribe((data: Inventory[]) => {
        this.floors = data;
      });
  }
  floorValueSet(floorKey) {
    this.FloorKey = floorKey;
  }
  addEquipment(EquipmentName, EquipmentDescription, barcode, EquipmentTypeKey) {

    if (!EquipmentTypeKey) {
      alert("Equipment Type is not provided");
    } else if (!EquipmentName) {
      alert("Equipment Name is not provided");
    } else if (!barcode) {
      alert("Equipment Barcode is not provided");
    } else if (!this.FacKey) {
      alert("Building is not provided");
    } else if (!this.FloorKey) {
      alert("Floor is not provided");
    } else {
      this.inventoryService.checkForNewEquipment(EquipmentTypeKey, EquipmentName).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (this.dept[0].count > 0) {
          alert("Equipment already present");
        }
        else if (this.dept[0].count == 0) {
          this.inventoryService.checkForNewEquipmentbarcode(barcode).subscribe((data: Inventory[]) => {
            this.dept = data;
            if (this.dept[0].count > 0) {
              alert("Equipment Barcode already present");
            } else if (this.dept[0].count == 0) {
              this.inventoryService.addEquipment(EquipmentName, EquipmentDescription, barcode, EquipmentTypeKey, this.FacKey, this.FloorKey)
                .subscribe(res => {
                  alert("Equipment created successfully");
                  this.router.navigateByUrl('/EquipmentView');
              });
            }
          });
        }
      });
    }
  }

  ngOnInit() {
    this.inventoryService
      .getAllEquipmentType()
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
      });
    this.inventoryService
      .getBarcodeForEquipment()
      .subscribe((data: Array<any>) => {
        this.barcode = data[0];
      });

    this.inventoryService
      .getallBuildingList()
      .subscribe((data: Inventory[]) => {
        this.buildings = data;
      });
  }
}
