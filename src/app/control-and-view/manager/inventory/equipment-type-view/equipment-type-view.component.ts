import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-equipment-type-view',
  templateUrl: './equipment-type-view.component.html',
  styleUrls: ['./equipment-type-view.component.scss']
})
export class EquipmentTypeViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
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
  previousPage() {
    this.pageNo = +this.pageNo - 1;
    this.inventoryService
    .getEquipmentTypeList()
    .subscribe((data: Inventory[]) => {
      this.equipmentType = data;
      if (this.pageNo == 1) {
        this.showHide2 = true;
        this.showHide1 = false;
      } else {
        this.showHide2 = true;
        this.showHide1 = true;
      }
    });
  }

  nextPage() {
    this.pageNo = +this.pageNo + 1;
    this.inventoryService
    .getEquipmentTypeList()
    .subscribe((data: Inventory[]) => {
      this.equipmentType = data;
      this.pagination = +this.equipmentType[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
      if (this.pagination > 1) {
        this.showHide2 = true;
        this.showHide1 = true;
      }
      else {
        this.showHide2 = false;
        this.showHide1 = true;
      }
    });
  }

  searchEquipmentType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchEquipmentType(SearchValue).subscribe((data: Inventory[]) => {
          this.equipmentType = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getEquipmentTypeList()
        .subscribe((data: Inventory[]) => {
          this.equipmentType = data;
          if (this.equipmentType[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.equipmentType[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
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
            if (this.equipmentType[0].totalItems > this.itemsPerPage) {
              this.showHide2 = true;
              this.showHide1 = false;
            }
            else if (this.equipmentType[0].totalItems <= this.itemsPerPage) {
              this.showHide2 = false;
              this.showHide1 = false;
            }
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getEquipmentTypeList()
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
        if (this.equipmentType[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.equipmentType[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchEquipmentType: ['', Validators.required]
    });
  }


}
