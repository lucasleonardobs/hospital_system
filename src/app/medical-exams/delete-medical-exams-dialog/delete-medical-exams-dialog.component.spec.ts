import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicalExamsDialogComponent } from './delete-medical-exams-dialog.component';

describe('DeleteMedicalExamsDialogComponent', () => {
  let component: DeleteMedicalExamsDialogComponent;
  let fixture: ComponentFixture<DeleteMedicalExamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedicalExamsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicalExamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
