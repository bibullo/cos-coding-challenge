import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';

import { AuctionsService } from './auctions.service';
import { AuctionsStore } from './auctions.store';

import { BasicVehicleAuctionMock } from './mocks/auction.mock';

describe('AuctionsService', () => {
  let auctionsService: AuctionsService;
  let auctionsStore: AuctionsStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuctionsService, AuctionsStore],
      imports: [HttpClientTestingModule],
    });

    auctionsService = TestBed.inject(AuctionsService);
    auctionsStore = TestBed.inject(AuctionsStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(auctionsService).toBeDefined();
  });

  it('should have a getBuyerAuctions function', () => {
    const expectedUrl = `${environment.apiUrl}/v2/auction/buyer/`;
    const storeSpy = jest.spyOn(auctionsStore, 'updateAuctions');

    const mockResponse = {
      items: [BasicVehicleAuctionMock],
      page: 1,
      total: 2,
    };

    auctionsService.getBuyerAuctions();

    const mockRequest = httpMock.expectOne(expectedUrl);
    mockRequest.flush(mockResponse);

    expect(mockRequest.request.method).toBe('GET');
    expect(storeSpy).toBeCalledWith(mockResponse.items);
  });
});
