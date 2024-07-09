import { TestBed } from '@angular/core/testing';

import { FormDaServiceService } from './form-da-service.service';

describe('FormDaServiceService', () => {
  let service: FormDaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
