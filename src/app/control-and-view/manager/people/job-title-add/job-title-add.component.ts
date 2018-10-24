import { Component, OnInit } from '@angular/core';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-title-add',
  templateUrl: './job-title-add.component.html',
  styleUrls: ['./job-title-add.component.scss']
})
export class JobTitleAddComponent implements OnInit {

  constructor(private peopleServiceService: PeopleServiceService, private router: Router) { }

  addNewJobtitle(JobtitleName, JobTitleDescription) {
    this.peopleServiceService.addJobtitle(JobtitleName, JobTitleDescription)
      .subscribe(res => this.router.navigateByUrl('/JobTitleView'));

  }

  ngOnInit() {
  }

}
