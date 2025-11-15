import { TestBed } from '@angular/core/testing';

import { SpecificCateService } from './specific-cate.service';

describe('SpecificCateService', () => {
  let service: SpecificCateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificCateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
