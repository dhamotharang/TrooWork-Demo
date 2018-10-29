import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';

@Component({
  selector: 'app-work-order-type',
  templateUrl: './work-order-type.component.html',
  styleUrls: ['./work-order-type.component.scss']
})
export class WorkOrderTypeComponent implements OnInit {
  workorderTypeList:workorder[];
  pageno;
  items_perpage;
  emp_key;
  org_id;
  delete_WOType;
  wot_key;
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }
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

  ngOnInit() {
    this.emp_key = 2861;
    this.org_id = 21;
    this.pageno=1;
    this.items_perpage=25;
    this.WorkOrderServiceService
    .getall_workordertype(this.pageno,this.items_perpage,this.emp_key, this.org_id)
    .subscribe((data: any[]) => {
      this.workorderTypeList = data;
    });
    this.searchform = this.formBuilder.group({
      searchworkordertype: ['', Validators.required]
    });
  }
  searchWOType(key)
  {
    this.WorkOrderServiceService
    .search_workordertype(this.org_id,key)
    .subscribe((data: any[]) => {
      this.workorderTypeList = data;
    });

  }
  passWOT(key)
  {
    this.wot_key=key;
  }
  deleteWOType()
  {
    debugger;
   this.delete_WOType={
    WorkorderTypeKey: this.wot_key,
    OrganizationID:this.org_id
    };
    this.WorkOrderServiceService
      .DeleteWOT(this.delete_WOType).subscribe(() => {

        this.WorkOrderServiceService
    .getall_workordertype(this.pageno,this.items_perpage,this.emp_key, this.org_id)
    .subscribe((data: any[]) => {
      this.workorderTypeList = data;
          });

      });
  }

}
