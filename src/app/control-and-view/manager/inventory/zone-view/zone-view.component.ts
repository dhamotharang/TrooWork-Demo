import { Component, OnInit, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
@Component({
  selector: 'app-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.scss']
})
export class ZoneViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  zone: Inventory[];
  searchform: FormGroup;

  delete_faciKey: number;
  delete_floorKey: number;
  delete_zoneKey: number;

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
      .getZones()
      .subscribe((data: Inventory[]) => {
        this.zone = data;
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
      .getZones()
      .subscribe((data: Inventory[]) => {
        this.zone = data;
      this.pagination = +this.zone[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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


  searchZone(SearchValue) {
    //  debugger;
    if (SearchValue.length >= 3) {
      this.inventoryService
        .searchZone(SearchValue).subscribe((data: Inventory[]) => {
          this.zone = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getZones()
        .subscribe((data: Inventory[]) => {
          this.zone = data;
          if (this.zone[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.zone[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  };

  deleteZoneValuePass(FacilityKey, FloorKey, ZoneKey) {
    this.delete_faciKey = FacilityKey;
    this.delete_floorKey = FloorKey;
    this.delete_zoneKey = ZoneKey;
  }

  deleteZone() {
    this.inventoryService
      .DeleteZone(this.delete_faciKey, this.delete_floorKey, this.delete_zoneKey).subscribe(res =>{
        this.inventoryService
      .getZones()
      .subscribe((data: Inventory[]) => {
        this.zone = data;
        if (this.zone[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.zone[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

      });

  }
  ngOnInit() {
    // debugger;
    this.inventoryService
      .getZones()
      .subscribe((data: Inventory[]) => {
        this.zone = data;
        if (this.zone[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.zone[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchZone: ['', Validators.required]
    });
  }
}
