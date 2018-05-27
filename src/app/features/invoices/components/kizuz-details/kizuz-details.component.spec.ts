import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KizuzDetailsComponent } from './kizuz-details.component';

describe('KizuzDetailsComponent', () => {
  let component: KizuzDetailsComponent;
  let fixture: ComponentFixture<KizuzDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KizuzDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KizuzDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
