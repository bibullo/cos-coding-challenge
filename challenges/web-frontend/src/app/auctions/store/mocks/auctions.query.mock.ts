import { Observable, of } from 'rxjs';
import { BasicVehicleAuction } from '../../models/basic-vehicle-auction.model';
import { BasicVehicleAuctionMock } from './auction.mock';

export class AuctionsQueryMock {
  readonly auctions$: Observable<BasicVehicleAuction[]>;

  constructor() {
    this.auctions$ = of([BasicVehicleAuctionMock]);
  }
}
