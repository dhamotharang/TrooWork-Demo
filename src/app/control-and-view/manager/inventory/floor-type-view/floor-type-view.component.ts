import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-floor-type-view',
  templateUrl: './floor-type-view.component.html',
  styleUrls: ['./floor-type-view.component.scss']
})
export class FloorTypeViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  floorType: Inventory[];
  delete_FloorTypeKey: number;
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
    .getFloorTypeList()
    .subscribe((data: Inventory[]) => {
      this.floorType = data;
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
    .getFloorTypeList()
    .subscribe((data: Inventory[]) => {
      this.floorType = data;
      this.pagination = +this.floorType[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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

  searchFloorType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchFloorType(SearchValue).subscribe((data: Inventory[]) => {
          this.floorType = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getFloorTypeList()
        .subscribe((data: Inventory[]) => {
          this.floorType = data;
          if (this.floorType[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.floorType[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  }

  deleteFloorTypePass(FloorTypeKey) {
    this.delete_FloorTypeKey = FloorTypeKey;
  }

  deleteFloorType() {
    this.inventoryService
      .DeleteFloorType(this.delete_FloorTypeKey).subscribe(() => {
        this.inventoryService
          .getFloorTypeList()
          .subscribe((data: Inventory[]) => {
            this.floorType = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getFloorTypeList()
      .subscribe((data: Inventory[]) => {
        this.floorType = data;
        if (this.floorType[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.floorType[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchFloorType: ['', Validators.required]
    });
  }

}
