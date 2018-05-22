import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSwipeReportComponent } from './card-swipe-report.component';

describe('CardSwipeReportComponent', () => {
  let component: CardSwipeReportComponent;
  let fixture: ComponentFixture<CardSwipeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSwipeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSwipeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
