import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewDialogComponent } from './patient-view-dialog.component';

describe('PatientViewDialogComponent', () => {
  let component: PatientViewDialogComponent;
  let fixture: ComponentFixture<PatientViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
