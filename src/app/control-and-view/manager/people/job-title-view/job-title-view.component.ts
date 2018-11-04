import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-title-view',
  templateUrl: './job-title-view.component.html',
  styleUrls: ['./job-title-view.component.scss']
})
export class JobTitleViewComponent implements OnInit {
  jobView: People[];
  deleteJobtitleKey: number;
  searchform: FormGroup;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;

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


  constructor(private formBuilder: FormBuilder, private peopleServiceService: PeopleServiceService, private router: Router) { }

  searchJobTitle(SearchJobTitle) {
      if(SearchJobTitle.length>2){
    this.peopleServiceService.searchJobtitle(SearchJobTitle, this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.jobView = data;

    });
  }
  }
  deleteJobPass(key) {
    this.deleteJobtitleKey = key;

  }
  deleteJobTitle() {
    this.peopleServiceService.deleteJobTitle(this.deleteJobtitleKey, this.OrganizationID)
      .subscribe(res =>
        this.peopleServiceService.getJobtitleView(this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
          this.jobView = data;

        })
      );
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

    this.peopleServiceService.getJobtitleView(this.employeekey, this.OrganizationID).subscribe((data: People[]) => {
      this.jobView = data;

    });

    this.searchform = this.formBuilder.group({
      SearchJobTitle: ['', Validators.required]
    });
  }

  
}
