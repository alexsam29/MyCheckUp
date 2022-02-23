import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDoctorsComponent } from './approve-doctors.component';

describe('ApproveDoctorsComponent', () => {
  let component: ApproveDoctorsComponent;
  let fixture: ComponentFixture<ApproveDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
