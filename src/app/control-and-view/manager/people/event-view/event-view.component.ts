import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  searchform: FormGroup;
  eventType: People[];
  ActionKey: Number;
  ActionTypeKey: Number;

  //validation starts ..... @rodney
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private peopleServ: PeopleServiceService, private el: ElementRef) { }
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

  deleteEventValuePass(actionKey, actiontypeKey) {
    this.ActionKey = actionKey;
    this.ActionTypeKey = actiontypeKey;
  }


  deleteEventType() {
    this.peopleServ
      .DeleteEventType(this.ActionKey, this.ActionTypeKey).subscribe(res => {
        this.peopleServ
          .getEventTypeList()
          .subscribe((data: People[]) => {
            this.eventType = data;
          });
      });

  }

  ngOnInit() {
    this.searchform = this.formBuilder.group({
      SearchMeetingTraining: ['', Validators.required]
    });


    this.peopleServ
      .getEventTypeList()
      .subscribe((data: People[]) => {
        this.eventType = data;
      });

  }

}
