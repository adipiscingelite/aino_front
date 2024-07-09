import { TestBed } from '@angular/core/testing';

import { MasterDocServiceService } from './master-doc-service.service';

describe('MasterDocServiceService', () => {
  let service: MasterDocServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDocServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
