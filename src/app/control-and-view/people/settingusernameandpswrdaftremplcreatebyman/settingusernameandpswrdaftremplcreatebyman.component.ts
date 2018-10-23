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
  
  str$:Object;
  sasemail:People[];
  empKey$:Object;
  orgid:Number=21;
  password:String='troowork';
  reEnterPassword:String='troowork';
  username:any;

  constructor(private route: ActivatedRoute, private peopleService: PeopleServiceService, private http: HttpClient) {
    this.route.params.subscribe(params => this.empKey$ = params.EmployeeKey);
    this.route.params.subscribe(params => this.str$ = params.str);
   }

   setUsernamePassword(){

    
   }

  ngOnInit() {
    this.username=this.str$;
    this.peopleService.getuserNamePasswordforsaveandSendemail(this.empKey$,this.orgid).subscribe((data: People[]) => {
      this.sasemail = data;
      // debugger;
    });
  }

}
