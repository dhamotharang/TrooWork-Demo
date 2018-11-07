import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  jobtitle: People[];
  employeedetailstable: People[];
  searchform: FormGroup;

  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  JobTitleKey;
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

  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private formBuilder: FormBuilder, private PeopleServiceService: PeopleServiceService, private el: ElementRef) { }

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
  getempdettablewithselectedJobtitle(seljobtitlevalue) {
    this.PeopleServiceService
      .getAllEmployeeDetailswithjobtitledropdown(seljobtitlevalue, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.employeedetailstable = data;
      });

  }
  searchEmployeeDetails(SearchValue) {
    
      if (SearchValue.length >= 3) {
        this.PeopleServiceService
        .searchResultOfEmployeedetailsTable(SearchValue, this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
          this.employeedetailstable = data;
          this.showHide2 = false;
          this.showHide1 = false;
        });
      } else if (SearchValue.length == 0) {
        this.PeopleServiceService.getAllEmployeeDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
          this.employeedetailstable = data;
          if (this.employeedetailstable[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.employeedetailstable[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
        });
      }
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

    this.JobTitleKey="";
    this.PeopleServiceService
      .getJobTitle(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getAllEmployeeDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.employeedetailstable = data;
        if (this.employeedetailstable[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.employeedetailstable[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
      });
    this.searchform = this.formBuilder.group({
      SearchEmpDetails: ['', Validators.required]
    });
  }

  previousPage() {
    this.pageNo = +this.pageNo - 1;
    this.PeopleServiceService.getAllEmployeeDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.employeedetailstable = data;
      if (this.pageNo == 1) {
        this.showHide2 = true;
        this.showHide1 = false;
      } else {
        this.showHide2 = true;
        this.showHide1 = true;
      }
    });
  }
  nextPage() {
    this.pageNo = +this.pageNo + 1;
    this.PeopleServiceService.getAllEmployeeDetails(this.pageNo, this.itemsPerPage, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.employeedetailstable = data;
      this.pagination = +this.employeedetailstable[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
      if (this.pagination > 1) {
        this.showHide2 = true;
        this.showHide1 = true;
      }
      else {
        this.showHide2 = false;
        this.showHide1 = true;
      }
    });
  }

}
