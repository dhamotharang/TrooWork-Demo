import { Component, OnInit,OnChanges, Directive, HostListener, ElementRef, Input  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../model-Class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  jobtitle:People[];
  employeedetailstable:People[];
  searchform: FormGroup;

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
  getempdettablewithselectedJobtitle(seljobtitlevalue){
    this.PeopleServiceService
    .getAllEmployeeDetailswithjobtitledropdown(seljobtitlevalue)
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;
    });

  }
  searchEmployeeDetails(SearchValue){
    this.PeopleServiceService
    .searchResultOfEmployeedetailsTable(SearchValue)
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;
    });
  }
  ngOnInit() {
    this.PeopleServiceService
    .getJobTitle()
    .subscribe((data: People[]) => {
      // debugger;
      this.jobtitle = data;
    });
    this.PeopleServiceService
    .getAllEmployeeDetails()
    .subscribe((data: People[]) => {
      // debugger;
      this.employeedetailstable = data;
    });
    this.searchform = this.formBuilder.group({
      SearchEmpDetails: ['', Validators.required]
    });
  }

}
