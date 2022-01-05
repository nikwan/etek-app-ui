import { TestBed } from '@angular/core/testing';

import { SearchWithPagiService } from './search-with-pagi.service';

describe('SearchWithPagiService', () => {
  let service: SearchWithPagiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchWithPagiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
