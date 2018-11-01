import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
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
  pageNo: Number = 1;
  itemsperPage: Number = 25;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }


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
      .DeleteBuilding(this.delete_faciKey, this.employeekey, this.OrganizationID).subscribe(() => {

        this.inventoryService
          .getBuildings(this.pageNo, this.itemsperPage, this.employeekey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.build = data;
          });

      });


  }

  searchFacility(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchBuilding(SearchValue, this.OrganizationID).subscribe((data: Inventory[]) => {
          this.build = data;

        });
    }
  };


  deleteFacPass(FacilityKey) {
    this.delete_faciKey = FacilityKey;
    //debugger;
  }
  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService
      .getBuildings(this.pageNo, this.itemsperPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.build = data;
      });

    this.searchform = this.formBuilder.group({
      SearchFacility: ['', Validators.required]
    });
  }

}
