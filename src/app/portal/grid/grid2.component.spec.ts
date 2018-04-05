import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid2Component } from './grid2.component';

describe('Grid2Component', () => {
  let component: Grid2Component;
  let fixture: ComponentFixture<Grid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
