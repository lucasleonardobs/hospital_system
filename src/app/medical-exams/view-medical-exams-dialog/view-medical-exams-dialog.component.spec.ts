import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalExamsDialogComponent } from './view-medical-exams-dialog.component';

describe('ViewMedicalExamsDialogComponent', () => {
  let component: ViewMedicalExamsDialogComponent;
  let fixture: ComponentFixture<ViewMedicalExamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMedicalExamsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicalExamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
