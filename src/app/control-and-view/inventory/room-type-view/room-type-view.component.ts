import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-room-type-view',
  templateUrl: './room-type-view.component.html',
  styleUrls: ['./room-type-view.component.scss']
})
export class RoomTypeViewComponent implements OnInit {
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

  searchRoomType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchRoomType(SearchValue).subscribe((data: Inventory[]) => {
          this.roomTypes = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getRoomTypeList()
        .subscribe((data: Inventory[]) => {
          this.roomTypes = data;
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
      });

    this.searchform = this.formBuilder.group({
      SearchRoomType: ['', Validators.required]
    });
  }


}
