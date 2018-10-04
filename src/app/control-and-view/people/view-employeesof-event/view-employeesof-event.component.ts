import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeopleServiceService } from '../../../service/people-service.service';
import { People } from '../../../Model-Class/People';

@Component({
  selector: 'app-view-employeesof-event',
  templateUrl: './view-employeesof-event.component.html',
  styleUrls: ['./view-employeesof-event.component.scss']
})
export class ViewEmployeesofEventComponent implements OnInit {

  eventKey$: Object;
  eventEmps: People[];
  eventKey: Number;

  constructor(private route: ActivatedRoute, private peopleServ: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.eventKey$ = params.EventKey);
  }

  markAttended(empKey, isAttend, eventKey) {
    this.peopleServ
      .markAttendance(empKey, eventKey)
      .subscribe((data: People[]) => {
        this.peopleServ.viewEmployeesOfEvent(this.eventKey$).subscribe((data: People[]) => {
          this.eventEmps = data;
        });
      });
  }

  markUnAttended(empKey, isAttend, eventKey) {
    this.peopleServ
      .removeAttendance(empKey, eventKey)
      .subscribe((data: People[]) => {
        this.peopleServ.viewEmployeesOfEvent(this.eventKey$).subscribe((data: People[]) => {
          this.eventEmps = data;
        });
      });
  }

  deleteMeetingPass(EventKey) {
    this.eventKey = EventKey;
  }

  deleteMeeting() {
    this.peopleServ
      .DeleteMeetingTraining(this.eventKey)
      .subscribe(res => this.router.navigateByUrl('/MeetingTrainingView'));
  }

  ngOnInit() {

    this.peopleServ.viewEmployeesOfEvent(this.eventKey$).subscribe((data: People[]) => {
      this.eventEmps = data;
    });
  }
}
