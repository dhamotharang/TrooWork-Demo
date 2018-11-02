import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  viewmeeting: People[];
  searchform: FormGroup;
  role;
  IsSupervisor;
  name;
  employeekey;
  OrganizationID;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  page: Number = 1;
  itemCount: Number = 25;
  constructor(private formBuilder: FormBuilder, private el: ElementRef, private PeopleServiceService: PeopleServiceService) { }

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
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
  searchMeeting(SearchValue) {
    var curr_date = this.convert_DT(new Date());
    this.PeopleServiceService
      .SearchMeetingviewforemployee(SearchValue, this.employeekey, this.OrganizationID, curr_date).subscribe((data: People[]) => {
        this.viewmeeting = data;

      });

  };
  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    var curr_date = this.convert_DT(new Date());
    this.PeopleServiceService
      .getMeetingTrainingViewforemployee(this.page, this.itemCount, curr_date, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.viewmeeting = data;
      });

    this.searchform = this.formBuilder.group({
      SearchMeeting: ['', Validators.required]
    });
  }

}
