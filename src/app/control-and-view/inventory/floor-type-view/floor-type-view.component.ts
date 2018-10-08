import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-floor-type-view',
  templateUrl: './floor-type-view.component.html',
  styleUrls: ['./floor-type-view.component.scss']
})
export class FloorTypeViewComponent implements OnInit {

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

  searchFloorType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchFloorType(SearchValue).subscribe((data: Inventory[]) => {
          this.floorType = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getFloorTypeList()
        .subscribe((data: Inventory[]) => {
          this.floorType = data;
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
      });

    this.searchform = this.formBuilder.group({
      SearchFloorType: ['', Validators.required]
    });
  }

}
