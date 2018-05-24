import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAndCloseInvoiceComponent } from './validate-and-close-invoice.component';

describe('ValidateAndCloseInvoiceComponent', () => {
  let component: ValidateAndCloseInvoiceComponent;
  let fixture: ComponentFixture<ValidateAndCloseInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateAndCloseInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAndCloseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
