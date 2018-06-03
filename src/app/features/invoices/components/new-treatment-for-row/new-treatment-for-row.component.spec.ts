import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatmentForRowComponent } from './new-treatment-for-row.component';

describe('NewTreatmentForRowComponent', () => {
  let component: NewTreatmentForRowComponent;
  let fixture: ComponentFixture<NewTreatmentForRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTreatmentForRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTreatmentForRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
