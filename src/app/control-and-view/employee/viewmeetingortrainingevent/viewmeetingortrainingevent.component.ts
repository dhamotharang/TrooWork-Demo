import { Component, OnInit,OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
@Component({
  selector: 'app-viewmeetingortrainingevent',
  templateUrl: './viewmeetingortrainingevent.component.html',
  styleUrls: ['./viewmeetingortrainingevent.component.scss']
})
export class ViewmeetingortrainingeventComponent implements OnInit {

  viewmeeting:People[];
  searchform: FormGroup;
  empKey: number = 2931;
  orgID: number = 21;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private formBuilder: FormBuilder,private el: ElementRef,private PeopleServiceService: PeopleServiceService) { }
  
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
    this.PeopleServiceService
      .SearchMeetingviewforemployee(SearchValue,this.empKey,this.orgID,curr_date).subscribe((data: People[]) => {
        this.viewmeeting = data;

      });

  };
  ngOnInit() {
    
    var curr_date = this.convert_DT(new Date());
    this.PeopleServiceService
    .getMeetingTrainingViewforemployee(curr_date,this.empKey,this.orgID)
    .subscribe((data: People[]) => {
      this.viewmeeting = data;
    });

    this.searchform = this.formBuilder.group({
      SearchMeeting: ['', Validators.required]
    });
  }

}
