import { BasicVehicleAuction } from './basic-vehicle-auction.model';

export interface BuyerAuctionsResponse {
  items: BasicVehicleAuction[];
  page: number;
  total: number;
}
