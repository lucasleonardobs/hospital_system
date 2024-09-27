import { TestBed } from '@angular/core/testing';

import { MedicalExamsService } from './medical-exams.service';

describe('MedicalExamsService', () => {
  let service: MedicalExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
