import { TestBed } from '@angular/core/testing';

import { HandleLoginService } from './handle-login.service';

describe('HandleLoginService', () => {
  let service: HandleLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
