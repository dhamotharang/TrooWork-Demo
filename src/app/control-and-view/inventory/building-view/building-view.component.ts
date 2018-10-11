import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.scss']
})
export class BuildingViewComponent implements OnInit {

  build: Inventory[];
  delete_faciKey: number;
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
  deleteFacility() {
    //debugger;
    this.inventoryService
      .DeleteBuilding(this.delete_faciKey).subscribe(() => {

        this.inventoryService
          .getBuildings()
          .subscribe((data: Inventory[]) => {
            this.build = data;
          });

      });


  }

  searchFacility(SearchValue) {
    this.inventoryService
      .SearchBuilding(SearchValue).subscribe((data: Inventory[]) => {
        this.build = data;

      });

  };


  deleteFacPass(FacilityKey) {
    this.delete_faciKey = FacilityKey;
    //debugger;
  }
  ngOnInit() {
    this.inventoryService
      .getBuildings()
      .subscribe((data: Inventory[]) => {
        this.build = data;
      });

    this.searchform = this.formBuilder.group({
      SearchFacility: ['', Validators.required]
    });
  }

}
