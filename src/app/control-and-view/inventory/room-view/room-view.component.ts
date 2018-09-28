import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {

  rooms: Inventory[];
  delete_roomKey: number;
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

  searchRoom(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchRoom(SearchValue).subscribe((data: Inventory[]) => {
          this.rooms = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getRoomList()
        .subscribe((data: Inventory[]) => {
          this.rooms = data;
        });
    }
  }

  deleteRoomPass(RoomKey) {
    this.delete_roomKey = RoomKey;
  }

  deleteRoom() {
    this.inventoryService
      .DeleteRoom(this.delete_roomKey).subscribe(() => {
        this.inventoryService
          .getRoomList()
          .subscribe((data: Inventory[]) => {
            this.rooms = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getRoomList()
      .subscribe((data: Inventory[]) => {
        this.rooms = data;
      });

    this.searchform = this.formBuilder.group({
      SearchRoom: ['', Validators.required]
    });
  }

}
