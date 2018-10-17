import { Component, OnInit,OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss']
})
export class ViewemployeeComponent implements OnInit {
  
  jobtitle:People[];
  employeedetailstable:People[];
  searchform: FormGroup;
   orgid:Number;
   empkey:Number;
   ManagerKey:Number;
   JobTitleKey:Number;
   manager:People[];
  //  seljobtitlevalue:any;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private formBuilder: FormBuilder,private PeopleServiceService: PeopleServiceService,private el: ElementRef) { }

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
  // seljobtitlevalue,ManagerKey
  getempdettablewithselectedddvsa(){
    this.PeopleServiceService
    .getAllEmployeeDetailswithjobtitledropdownsa(this.orgid,this.empkey,this.JobTitleKey,this.ManagerKey)
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;
    });

  }

  searchEmployeeDetails(SearchValue){
    
    if (SearchValue.length > 2) {
      this.PeopleServiceService
    .searchResultOfEmployeedetailsTable(SearchValue)
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;

        });
    }
  }
  ngOnInit() {
    this.orgid=21;
    this.empkey=2751;

    this.PeopleServiceService
    .getJobTitle()
    .subscribe((data: People[]) => {
      // debugger;
      this.jobtitle = data;
    });
    this.PeopleServiceService
    .getvaluesForManagerDropdowninSA(this.empkey,this.orgid)
    .subscribe((data: People[]) => {
      // debugger;
      this.manager = data;
    });
    this.PeopleServiceService
    .getAllEmployeeDetailsSuper(this.empkey,this.orgid)
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;
    });
    this.searchform = this.formBuilder.group({
      SearchEmpDetails: ['', Validators.required]
    });
  }

}
