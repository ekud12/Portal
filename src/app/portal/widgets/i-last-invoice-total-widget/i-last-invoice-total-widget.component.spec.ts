import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ILastInvoiceTotalWidgetComponent } from './i-last-invoice-total-widget.component';

describe('ILastInvoiceTotalWidgetComponent', () => {
  let component: ILastInvoiceTotalWidgetComponent;
  let fixture: ComponentFixture<ILastInvoiceTotalWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ILastInvoiceTotalWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ILastInvoiceTotalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
