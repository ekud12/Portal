import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewInvoiceComponent } from './upload-new-invoice.component';

describe('UploadNewInvoiceComponent', () => {
  let component: UploadNewInvoiceComponent;
  let fixture: ComponentFixture<UploadNewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNewInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
