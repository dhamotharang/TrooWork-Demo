import { Component, OnInit, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-floor-view',
  templateUrl: './floor-view.component.html',
  styleUrls: ['./floor-view.component.scss']
})
export class FloorViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  floor: Inventory[];
  delete_faciKey: number;
  delete_floorKey: number;
  searchform: FormGroup;
  //validation starts ..... @pooja
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

  //validation ends ..... @pooja
  previousPage() {
    this.pageNo = +this.pageNo - 1;
    this.inventoryService
    .getFloors()
    .subscribe((data: Inventory[]) => {
      this.floor = data;
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
    .getFloors()
    .subscribe((data: Inventory[]) => {
      this.floor = data;
      this.pagination = +this.floor[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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

  deleteFloor() {
    this.inventoryService
      .DeleteFloor(this.delete_faciKey, this.delete_floorKey).subscribe(res => {
        this.inventoryService
        .getFloors()
        .subscribe((data: Inventory[]) => {
          this.floor = data;
      if (this.floor[0].totalItems > this.itemsPerPage) {
        this.showHide2 = true;
        this.showHide1 = false;
      }
      else if (this.floor[0].totalItems <= this.itemsPerPage) {
        this.showHide2 = false;
        this.showHide1 = false;
      }
    });
  });
  }
  deleteFloorPass(FacilityKey, FloorKey) {
    this.delete_faciKey = FacilityKey;
    this.delete_floorKey = FloorKey;
  }

  searchFloor(SearchValue) {
    //  debugger;
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchFloor(SearchValue).subscribe((data: Inventory[]) => {
          this.floor = data;
          this.showHide2 = false;
          this.showHide1 = false;

        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getFloors()
        .subscribe((data: Inventory[]) => {
          this.floor = data;
          if (this.floor[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.floor[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  };

  ngOnInit() {
    // debugger;
    this.inventoryService
      .getFloors()
      .subscribe((data: Inventory[]) => {
        this.floor = data;
        if (this.floor[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.floor[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });
    this.searchform = this.formBuilder.group({
      SearchFloor: ['', Validators.required]
    });
  }

}
