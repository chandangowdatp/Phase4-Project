import { TestBed } from '@angular/core/testing';

import { CrudHTTPService } from './crud-http.service';

describe('CrudHTTPService', () => {
  let service: CrudHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
