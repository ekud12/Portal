import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakautWidgetComponent } from './zakaut-widget.component';

describe('ZakautWidgetComponent', () => {
  let component: ZakautWidgetComponent;
  let fixture: ComponentFixture<ZakautWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakautWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakautWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
