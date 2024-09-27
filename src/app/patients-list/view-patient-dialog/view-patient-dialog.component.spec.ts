import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientDialogComponent } from './view-patient-dialog.component';

describe('ViewPatientDialogComponent', () => {
  let component: ViewPatientDialogComponent;
  let fixture: ComponentFixture<ViewPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
