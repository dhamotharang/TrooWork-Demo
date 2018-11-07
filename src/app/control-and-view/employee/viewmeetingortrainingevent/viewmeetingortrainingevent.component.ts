import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
@Component({
  selector: 'app-viewmeetingortrainingevent',
  templateUrl: './viewmeetingortrainingevent.component.html',
  styleUrls: ['./viewmeetingortrainingevent.component.scss']
})
export class ViewmeetingortrainingeventComponent implements OnInit {
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  page: Number = 1;
  count: Number = 25;
  viewmeeting: People[];
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;

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
  constructor(private formBuilder: FormBuilder, private el: ElementRef, private PeopleServiceService: PeopleServiceService) { }

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
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
    if (SearchValue.length >= 3){
    this.PeopleServiceService
      .SearchMeetingviewforemployee(SearchValue, this.toServeremployeekey, this.OrganizationID, curr_date).subscribe((data: People[]) => {
        this.viewmeeting = data;
      
      });
    }
    else if (SearchValue.length == 0){
      this.PeopleServiceService
      .getMeetingTrainingViewforemployee(this.page, this.count, curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.viewmeeting = data;
      });
    }

  };
  ngOnInit() {

    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.toServeremployeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends
    var curr_date = this.convert_DT(new Date());
    this.PeopleServiceService
      .getMeetingTrainingViewforemployee(this.page, this.count, curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.viewmeeting = data;
      });

    this.searchform = this.formBuilder.group({
      SearchMeeting: ['', Validators.required]
    });
  }

}
