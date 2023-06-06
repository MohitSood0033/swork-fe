import { TestBed } from '@angular/core/testing';

import { DeliveryAdressService } from './delivery-adress.service';

describe('DeliveryAdressService', () => {
  let service: DeliveryAdressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryAdressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
