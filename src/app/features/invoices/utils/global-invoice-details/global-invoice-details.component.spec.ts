import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInvoiceDetailsComponent } from './global-invoice-details.component';

describe('GlobalInvoiceDetailsComponent', () => {
  let component: GlobalInvoiceDetailsComponent;
  let fixture: ComponentFixture<GlobalInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
