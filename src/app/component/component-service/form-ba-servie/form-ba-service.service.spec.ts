import { TestBed } from '@angular/core/testing';

import { FormBaServiceService } from './form-ba-service.service';

describe('FormBaServiceService', () => {
  let service: FormBaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
