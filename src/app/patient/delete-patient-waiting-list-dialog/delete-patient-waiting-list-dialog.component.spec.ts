import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatientWaitingListDialogComponent } from './delete-patient-waiting-list-dialog.component';

describe('DeletePatientWaitingListDialogComponent', () => {
  let component: DeletePatientWaitingListDialogComponent;
  let fixture: ComponentFixture<DeletePatientWaitingListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePatientWaitingListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatientWaitingListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
