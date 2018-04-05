import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRowTreatmentsComponent } from './invoice-row-treatments.component';

describe('InvoiceRowTreatmentsComponent', () => {
  let component: InvoiceRowTreatmentsComponent;
  let fixture: ComponentFixture<InvoiceRowTreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRowTreatmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRowTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
