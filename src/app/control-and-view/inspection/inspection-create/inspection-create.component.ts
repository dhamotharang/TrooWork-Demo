import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../../service/inspection.service';
import { Inspection } from '../../../model-class/Inspection';

@Component({
  selector: 'app-inspection-create',
  templateUrl: './inspection-create.component.html',
  styleUrls: ['./inspection-create.component.scss']
})
export class InspectionCreateComponent implements OnInit {
  templateName: Inspection[];

// adding properties and methods that will be used by the igxDatePicker
public date: Date = new Date(Date.now());

private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long'});
private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long'});

public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
}

  constructor(private inspectionService: InspectionService) { }

  ngOnInit() {

    this.inspectionService
    .getTemplateName()
    .subscribe((data: Inspection[]) => {
      // debugger;
      this.templateName = data;
    });
  }

}
