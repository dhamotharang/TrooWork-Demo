import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-room-type-view',
  templateUrl: './room-type-view.component.html',
  styleUrls: ['./room-type-view.component.scss']
})
export class RoomTypeViewComponent implements OnInit {
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  roomTypes: Inventory[];
  delete_RoomTypeKey: number;
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
    this.inventoryService
    .getRoomTypeList()
    .subscribe((data: Inventory[]) => {
      this.roomTypes = data;
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
    .getRoomTypeList()
    .subscribe((data: Inventory[]) => {
      this.roomTypes = data;
      this.pagination = +this.roomTypes[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
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


  searchRoomType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchRoomType(SearchValue).subscribe((data: Inventory[]) => {
          this.roomTypes = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getRoomTypeList()
        .subscribe((data: Inventory[]) => {
          this.roomTypes = data;
          if (this.roomTypes[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.roomTypes[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
    }
  }

  deleteRoomTypePass(RoomTypeKey) {
    this.delete_RoomTypeKey = RoomTypeKey;
  }

  deleteRoomType() {
    this.inventoryService
      .DeleteRoomType(this.delete_RoomTypeKey).subscribe(() => {
        this.inventoryService
          .getRoomTypeList()
          .subscribe((data: Inventory[]) => {
            this.roomTypes = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getRoomTypeList()
      .subscribe((data: Inventory[]) => {
        this.roomTypes = data;
        if (this.roomTypes[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.roomTypes[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });

    this.searchform = this.formBuilder.group({
      SearchRoomType: ['', Validators.required]
    });
  }


}
