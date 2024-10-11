import { TestBed } from '@angular/core/testing';

import { PollAuthService } from './poll-auth-service.service';

describe('PollAuthServiceService', () => {
  let service: PollAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
