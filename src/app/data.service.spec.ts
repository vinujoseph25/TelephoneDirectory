import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let expected = {};
  beforeEach(() => {
    expected = {
      type: 'success'
    };
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should have setOption function',
    inject([DataService], (service: DataService) => {
      expect(service.setOption).toBeTruthy();
    }));

  it('should have getOption function',
    inject([DataService], (service: DataService) => {
      expect(service.setOption).toBeTruthy();
    }));

  it('should return correctly',
    inject([DataService], (service: DataService) => {
      service.setOption('expected', expected);
      let data = service.getOption();
      expect(data['expected']).toEqual(expected);
    }));

});
