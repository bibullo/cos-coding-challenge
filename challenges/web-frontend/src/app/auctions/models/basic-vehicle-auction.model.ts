import { BasicVehicle } from './basic-vehicle.model';

export interface BasicVehicleAuction {
  associatedVehicle: BasicVehicle;
  currentHighestBidValue: number;
  amIHighestBidder: boolean;
  remainingTimeInSeconds: number;
}
