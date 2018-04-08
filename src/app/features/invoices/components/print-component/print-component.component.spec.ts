import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintComponentComponent } from './print-component.component';

describe('PrintComponentComponent', () => {
  let component: PrintComponentComponent;
  let fixture: ComponentFixture<PrintComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
