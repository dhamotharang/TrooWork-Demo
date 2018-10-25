import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-equipment-view',
  templateUrl: './equipment-view.component.html',
  styleUrls: ['./equipment-view.component.scss']
})
export class EquipmentViewComponent implements OnInit {

  equipments: Inventory[];
  delete_EquipKey: number;
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

  searchEquipment(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchEquipment(SearchValue).subscribe((data: Inventory[]) => {
          this.equipments = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getEquipmentList()
        .subscribe((data: Inventory[]) => {
          this.equipments = data;
        });
    }
  }

  deleteEquipPass(EquipKey) {
    this.delete_EquipKey = EquipKey;
  }

  deleteEquipments() {
    this.inventoryService
      .DeleteEquipment(this.delete_EquipKey).subscribe(() => {
        this.inventoryService
          .getEquipmentList()
          .subscribe((data: Inventory[]) => {
            this.equipments = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getEquipmentList()
      .subscribe((data: Inventory[]) => {
        this.equipments = data;
      });

    this.searchform = this.formBuilder.group({
      SearchEquipment: ['', Validators.required]
    });
  }

}
