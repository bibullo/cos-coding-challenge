import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { BuyerAuctionsResponse } from '../models/buyer-auctions-response.model';
import { AuctionsStore } from './auctions.store';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
  constructor(private auctionsStore: AuctionsStore, private http: HttpClient) {}

  getBuyerAuctions(): void {
    const url = `${environment.apiUrl}/v2/auction/buyer/`;

    this.http
      .get<BuyerAuctionsResponse>(url)
      .subscribe((response: BuyerAuctionsResponse) => {
        this.auctionsStore.updateAuctions(response.items);
      });
  }
}
