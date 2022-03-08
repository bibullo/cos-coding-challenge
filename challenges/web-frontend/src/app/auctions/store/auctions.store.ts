import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { BasicVehicleAuction } from '../models/basic-vehicle-auction.model';

export interface AuctionsState {
  auctions: BasicVehicleAuction[];
}

export function createInitialState(): AuctionsState {
  return {
    auctions: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auctions' })
export class AuctionsStore extends Store<AuctionsState> {
  constructor() {
    super(createInitialState());
  }

  updateAuctions(auctions: BasicVehicleAuction[]): void {
    this.update({ auctions });
  }
}
