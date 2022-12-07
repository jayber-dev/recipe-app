import { TestBed } from '@angular/core/testing';

import { UserLoginService } from './userLoginService.service';

describe('UserAuthService', () => {
  let service: UserLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
