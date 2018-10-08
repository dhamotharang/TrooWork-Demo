import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements OnInit {

  departments: Inventory[];
  delete_DeptKey: number;
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

  searchDepartment(SearchValue) {
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchDepartment(SearchValue).subscribe((data: Inventory[]) => {
          this.departments = data;
        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getDepartmentList()
        .subscribe((data: Inventory[]) => {
          this.departments = data;
        });
    }
  }

  deleteDeptPass(DeptKey) {
    this.delete_DeptKey = DeptKey;
  }

  deleteDepartment() {
    this.inventoryService
      .DeleteDepartment(this.delete_DeptKey).subscribe(() => {
        this.inventoryService
          .getDepartmentList()
          .subscribe((data: Inventory[]) => {
            this.departments = data;
          });
      });
  }

  ngOnInit() {
    this.inventoryService
      .getDepartmentList()
      .subscribe((data: Inventory[]) => {
        this.departments = data;
      });

    this.searchform = this.formBuilder.group({
      SearchDepartment: ['', Validators.required]
    });
  }


}
