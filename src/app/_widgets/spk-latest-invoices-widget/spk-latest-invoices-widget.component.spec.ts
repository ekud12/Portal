/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpkLatestInvoicesWidgetComponent } from './spk-latest-invoices-widget.component';

describe('SpkLatestInvoicesWidgetComponent', () => {
  let component: SpkLatestInvoicesWidgetComponent;
  let fixture: ComponentFixture<SpkLatestInvoicesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpkLatestInvoicesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpkLatestInvoicesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
