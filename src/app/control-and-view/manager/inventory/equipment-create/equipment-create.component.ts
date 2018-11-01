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

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private router: Router) {

  }

  selectFloorfromBuildings(facKey) {
    this.FacKey = facKey;
    this.inventoryService
      .getallFloorList(facKey, this.OrganizationID)
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
      this.inventoryService.checkForNewEquipment(EquipmentTypeKey, EquipmentName, this.employeekey, this.OrganizationID).subscribe((data: Inventory[]) => {
        this.dept = data;
        if (this.dept[0].count > 0) {
          alert("Equipment already present");
        }
        else if (this.dept[0].count == 0) {
          this.inventoryService.checkForNewEquipmentbarcode(barcode, this.OrganizationID).subscribe((data: Inventory[]) => {
            this.dept = data;
            if (this.dept[0].count > 0) {
              alert("Equipment Barcode already present");
            } else if (this.dept[0].count == 0) {
              this.inventoryService.addEquipment(EquipmentName, EquipmentDescription, barcode, EquipmentTypeKey, this.FacKey, this.FloorKey, this.employeekey, this.OrganizationID)
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
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService
      .getAllEquipmentType(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
      });
    this.inventoryService
      .getBarcodeForEquipment(this.employeekey, this.OrganizationID)
      .subscribe((data: Array<any>) => {
        this.barcode = data[0];
      });

    this.inventoryService
      .getallBuildingList(this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.buildings = data;
      });
  }
}
