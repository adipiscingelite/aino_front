import { TestBed } from '@angular/core/testing';

import { FormItcmServiceService } from './form-itcm-service.service';

describe('FormItcmServiceService', () => {
  let service: FormItcmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormItcmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
