import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { People } from '../../../Model-Class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-meeting-training-view',
  templateUrl: './meeting-training-view.component.html',
  styleUrls: ['./meeting-training-view.component.scss']
})
export class MeetingTrainingViewComponent implements OnInit {

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  searchform: FormGroup;
  meetingTraining: People[];
  public date1: Date = new Date(Date.now());
  todayDt: String;
  jobTitle: People[];
  empList: People[];


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

  hi(key) {
    alert("i am in " + key);
  }


  ngOnInit() {
    this.searchform = this.formBuilder.group({
      SearchMeetingTraining: ['', Validators.required]
    });


    this.peopleServ
      .getJobTitleList()
      .subscribe((data: People[]) => {
        this.jobTitle = data;
      });

    this.peopleServ
      .getallEmployeesList()
      .subscribe((data: People[]) => {
        this.empList = data;
      });

    this.todayDt = this.convert_DT(this.date1);
    this.peopleServ
      .gettodaysMeeting(this.todayDt)
      .subscribe((data: People[]) => {
        this.meetingTraining = data;
      });
    // multi select starts....
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'JobTitleKey',
      textField: 'JobTitleText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'EmployeeKey',
      textField: 'EmployeeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
    // multi select ends....
  }

}
