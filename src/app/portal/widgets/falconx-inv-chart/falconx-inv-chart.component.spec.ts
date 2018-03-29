import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconxInvChartComponent } from './falconx-inv-chart.component';

describe('FalconxInvChartComponent', () => {
  let component: FalconxInvChartComponent;
  let fixture: ComponentFixture<FalconxInvChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalconxInvChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconxInvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
