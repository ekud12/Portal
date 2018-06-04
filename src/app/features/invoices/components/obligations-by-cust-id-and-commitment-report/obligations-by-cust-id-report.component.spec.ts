import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationsByCustIdReportComponent } from './obligations-by-cust-id-report.component';

describe('ObligationsByCustIdReportComponent', () => {
  let component: ObligationsByCustIdReportComponent;
  let fixture: ComponentFixture<ObligationsByCustIdReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObligationsByCustIdReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationsByCustIdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
