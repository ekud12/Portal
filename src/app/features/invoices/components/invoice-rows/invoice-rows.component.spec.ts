import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRowsComponent } from './invoice-rows.component';

describe('InvoiceRowsComponent', () => {
  let component: InvoiceRowsComponent;
  let fixture: ComponentFixture<InvoiceRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
