import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';

@Component({
  selector: 'app-equipment-type-edit',
  templateUrl: './equipment-type-edit.component.html',
  styleUrls: ['./equipment-type-edit.component.scss']
})
export class EquipmentTypeEditComponent implements OnInit {
  equipTypeKey$: Object;
  // equipType: Inventory[];
  equipType: Array<any>;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.equipTypeKey$ = params.EquipTypeKey);
  }

  updateEquipmentType(equipTypeKey, equipType, equipTypeDesc) {
    debugger;
    if (!equipType) {
      alert("Please provide a Equipment Type");
    } else if (!equipTypeDesc) {
      alert("Please provide a Equipment Type Description");
    } else {
      this.inventoryService.checkForNewEquipmentType(equipType).subscribe((data: Array<any>) => {
        this.equipType = data;
        if (this.equipType[0].count==1) {
          alert("Equipment Type already present");
        }
        else {
          this.inventoryService.UpdateEquipmentType(equipType, equipTypeDesc, equipTypeKey).subscribe(res => {
            alert("Equipment Type  updated successfully");
            this.router.navigateByUrl('/EquipmentTypeView');
        });
        }
      });
    }
  }

  ngOnInit() {

    this.inventoryService.getEquipmentTypeListEdit(this.equipTypeKey$).subscribe((data: Array<any>) => {
      console.log(this.equipTypeKey$);
      debugger;
      this.equipType = data[0];
      console.log(data.length);
    });
  }
}
