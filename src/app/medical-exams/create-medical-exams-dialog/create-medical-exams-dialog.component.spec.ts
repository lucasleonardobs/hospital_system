import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalExamsDialogComponent } from './create-medical-exams-dialog.component';

describe('CreateMedicalExamsDialogComponent', () => {
  let component: CreateMedicalExamsDialogComponent;
  let fixture: ComponentFixture<CreateMedicalExamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedicalExamsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicalExamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
