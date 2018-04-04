import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWidgetComponent } from './test-widget.component';

describe('TestWidgetComponent', () => {
  let component: TestWidgetComponent;
  let fixture: ComponentFixture<TestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
