import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  actionKey$: Object;
  actionTypeKey$: Object;
  //dept: Inventory[];
  dept: Array<any>;

  constructor(private route: ActivatedRoute, private peopleServ: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.actionKey$ = params.ActionKey);
    this.route.params.subscribe(params => this.actionTypeKey$ = params.ActionTypeKey);
  }

  updateEventType(type, name, desc) {
debugger;
    this.peopleServ.UpdateEventType(type, name, desc, this.actionKey$, this.actionTypeKey$).subscribe(res => this.router.navigateByUrl('/EventView'));

  }

  ngOnInit() {
    this.peopleServ.getEventTypeDetails(this.actionKey$, this.actionTypeKey$).subscribe((data: Array<any>) => {
      debugger;
      this.dept = data[0];
    });
  }
}

