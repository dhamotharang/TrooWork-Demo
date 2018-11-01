import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { Inventory } from '../../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-equipment-type-view',
  templateUrl: './equipment-type-view.component.html',
  styleUrls: ['./equipment-type-view.component.scss']
})
export class EquipmentTypeViewComponent implements OnInit {

  equipmentType: Inventory[];
  delete_EquipTypeKey: number;
  searchform: FormGroup;
  pageNo: Number = 1;
  itemsPerPage: Number = 25;
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

  searchEquipmentType(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchEquipmentType(SearchValue, this.OrganizationID).subscribe((data: Inventory[]) => {
          this.equipmentType = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getEquipmentTypeList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
        .subscribe((data: Inventory[]) => {
          this.equipmentType = data;
        });
    }
  }

  deleteEquipTypePass(EquipTypeKey) {
    this.delete_EquipTypeKey = EquipTypeKey;
  }

  deleteEquipmentType() {
    this.inventoryService
      .DeleteEquipmentType(this.delete_EquipTypeKey, this.employeekey, this.OrganizationID).subscribe(() => {
        this.inventoryService
          .getEquipmentTypeList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
          .subscribe((data: Inventory[]) => {
            this.equipmentType = data;
          });
      });
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
      .getEquipmentTypeList(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: Inventory[]) => {
        this.equipmentType = data;
      });

    this.searchform = this.formBuilder.group({
      SearchEquipmentType: ['', Validators.required]
    });
  }


}
