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

  constructor(private formBuilder: FormBuilder, private peopleServiceService: PeopleServiceService, private router: Router) { }

  searchJobTitle(SearchJobTitle) {
    this.peopleServiceService.searchJobtitle(SearchJobTitle).subscribe((data: People[]) => {
      this.jobView = data;

    });
  }
  deleteJobPass(key) {
    this.deleteJobtitleKey = key;

  }
  deleteJobTitle() {
    this.peopleServiceService.deleteJobTitle(this.deleteJobtitleKey)
      .subscribe(res =>
        this.peopleServiceService.getJobtitleView().subscribe((data: People[]) => {
          this.jobView = data;

        })
      );
  }

  ngOnInit() {
    this.peopleServiceService.getJobtitleView().subscribe((data: People[]) => {
      this.jobView = data;

    });

    this.searchform = this.formBuilder.group({
      SearchJobTitle: ['', Validators.required]
    });
  }

}
