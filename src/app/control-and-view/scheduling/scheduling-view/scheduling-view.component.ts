import { Component, OnInit,HostListener,Input,ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-scheduling-view',
  templateUrl: './scheduling-view.component.html',
  styleUrls: ['./scheduling-view.component.scss']
})
export class SchedulingViewComponent implements OnInit {
  searchform: FormGroup;
  
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private el: ElementRef) { }
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

  

  

  ngOnInit() {

    this.searchform = this.formBuilder.group({
      SearchSchedule: ['', Validators.required]
    });
  }
  
}
