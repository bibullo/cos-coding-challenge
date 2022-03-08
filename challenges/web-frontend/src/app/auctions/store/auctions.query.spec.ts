import { AuctionsQuery } from './auctions.query';
import { AuctionsStore } from './auctions.store';

describe('AuctionsQuery', () => {
  let query: AuctionsQuery;

  beforeEach(() => {
    query = new AuctionsQuery(new AuctionsStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });

  it('should have a auctions$ observable', () => {
    expect(query.auctions$).toBeDefined();
  });
});
