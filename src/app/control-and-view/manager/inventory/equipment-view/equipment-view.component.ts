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
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
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
  previousPage() {
    this.pageNo = +this.pageNo - 1;
    this.inventoryService
      .getEquipmentList()
      .subscribe((data: Inventory[]) => {
        this.equipments = data;
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
    .getEquipmentList()
    .subscribe((data: Inventory[]) => {
      this.equipments = data;
      this.pagination = +this.equipments[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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

  searchEquipment(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchEquipment(SearchValue).subscribe((data: Inventory[]) => {
          this.equipments = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getEquipmentList()
        .subscribe((data: Inventory[]) => {
          this.equipments = data;
          if (this.equipments[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.equipments[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
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
        if (this.equipments[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.equipments[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchEquipment: ['', Validators.required]
    });
  }

}
