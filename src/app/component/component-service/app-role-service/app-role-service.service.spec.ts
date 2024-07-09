import { TestBed } from '@angular/core/testing';

import { AppRoleService } from './app-role-service.service';

describe('AppRoleServiceService', () => {
  let service: AppRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
