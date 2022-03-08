import { AuctionsStore } from './auctions.store';
import { BasicVehicleAuctionMock } from './mocks/auction.mock';

describe('AuctionsStore', () => {
  let store: AuctionsStore;

  beforeEach(() => {
    store = new AuctionsStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });

  it('should have a updateAuctions function', () => {
    const updateSpy = jest.spyOn(store, 'update');

    const auctionsMock = [BasicVehicleAuctionMock];

    store.updateAuctions(auctionsMock);

    expect(updateSpy).toHaveBeenLastCalledWith({ auctions: auctionsMock });
  });
});
