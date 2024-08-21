/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AccountDataService } from './account-data.service';

describe('Service: AuthenticationData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountDataService],
    });
  });

  it('should ...', inject(
    [AccountDataService],
    (service: AccountDataService) => {
      expect(service).toBeTruthy();
    }
  ));
});
