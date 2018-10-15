import { Component, OnInit } from '@angular/core';
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-settingusernameandpswrdaftremplcreatebyman',
  templateUrl: './settingusernameandpswrdaftremplcreatebyman.component.html',
  styleUrls: ['./settingusernameandpswrdaftremplcreatebyman.component.scss']
})
export class SettingusernameandpswrdaftremplcreatebymanComponent implements OnInit {
  build:People[];
  empKey$:Object;
  orgid:Number=21;
  constructor(private route: ActivatedRoute, private peopleService: PeopleServiceService, private http: HttpClient) {
    this.route.params.subscribe(params => this.empKey$ = params.EmpKey);
   }

  ngOnInit() {
    this.peopleService.getuserNamePasswordforsaveandSendemail(this.empKey$,this.orgid).subscribe((data: People[]) => {
      this.build = data;
      // debugger;
    });
  }

}
