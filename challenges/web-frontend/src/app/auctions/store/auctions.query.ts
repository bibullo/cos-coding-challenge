import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { BasicVehicleAuction } from '../models/basic-vehicle-auction.model';
import { AuctionsStore, AuctionsState } from './auctions.store';

@Injectable({ providedIn: 'root' })
export class AuctionsQuery extends Query<AuctionsState> {
  readonly auctions$: Observable<BasicVehicleAuction[]>;

  constructor(protected override store: AuctionsStore) {
    super(store);

    this.auctions$ = this.select('auctions');
  }
}
