import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-equipment-type-view',
  templateUrl: './equipment-type-view.component.html',
  styleUrls: ['./equipment-type-view.component.scss']
})
export class EquipmentTypeViewComponent implements OnInit {

  equipmentType: Inventory[];
  delete_EquipTypeKey: number;
  searchform: FormGroup;

  //validation starts ..... @rodney
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private inventoryService: InventoryService, private el: ElementRef) { }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

  //validation ends ..... @rodney

  searchEquipmentType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchEquipmentType(SearchValue).subscribe((data: Inventory[]) => {
          this.equipmentType = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getEquipmentTypeList()
        .subscribe((data: Inventory[]) => {
          this.equipmentType = data;
        });
    }
  }

  deleteEquipTypePass(EquipTypeKey) {
    this.delete_EquipTypeKey = EquipTypeKey;
  }

  deleteEquipmentType() {
    this.inventoryService
      .DeleteEquipmentType(this.delete_EquipTypeKey).subscribe(() => {
        this.inventoryService
          .getEquipmentTypeList()
          .subscribe((data: Inventory[]) => {
            this.equipmentType = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getEquipmentTypeList()
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
      });

    this.searchform = this.formBuilder.group({
      SearchEquipmentType: ['', Validators.required]
    });
  }


}
