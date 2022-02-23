import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrescriptionsComponent } from './view-prescriptions.component';

describe('ViewPrescriptionsComponent', () => {
  let component: ViewPrescriptionsComponent;
  let fixture: ComponentFixture<ViewPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
