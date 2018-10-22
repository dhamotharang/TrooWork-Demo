import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchScheduleNameEditComponent } from './batch-schedule-name-edit.component';

describe('BatchScheduleNameEditComponent', () => {
  let component: BatchScheduleNameEditComponent;
  let fixture: ComponentFixture<BatchScheduleNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchScheduleNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchScheduleNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
