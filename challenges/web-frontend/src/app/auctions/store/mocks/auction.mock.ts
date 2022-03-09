import { BasicVehicleAuction } from '../../models/basic-vehicle-auction.model';

export const BasicVehicleAuctionMock: BasicVehicleAuction = {
  associatedVehicle: {
    make: 'mockMake',
    ez: 'mockEz',
    mileageInKm: 100000,
    fuelType: 1,
    transmission: 1,
    vehicleImages: [{ url: 'mockImage' }],
  },
  currentHighestBidValue: 1000,
  amIHighestBidder: false,
  remainingTimeInSeconds: 1000,
};
