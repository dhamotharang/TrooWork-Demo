import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../../../model-class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-title-edit-admin',
  templateUrl: './job-title-edit-admin.component.html',
  styleUrls: ['./job-title-edit-admin.component.scss']
})
export class JobTitleEditAdminComponent implements OnInit {
  JobTitle_Key$: object;
  JobtitleDetails: People[];
  constructor(private route: ActivatedRoute, private peopleServiceService: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.JobTitle_Key$ = params.JobTitle_Key);
  }
  updateJobTitle(JobTitle, JobTitleDescription) {
    this.peopleServiceService.updateEditJobtitle(this.JobTitle_Key$, JobTitle, JobTitleDescription)
      .subscribe(res => this.router.navigateByUrl('/JobTitleViewAdmin'));
  }

  ngOnInit() {
    this.peopleServiceService.getEditJobtitleDetails(this.JobTitle_Key$).subscribe((data: People[]) => {
      this.JobtitleDetails = data;

    });
  }

}
