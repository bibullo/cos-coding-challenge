import { BasicVehicleAuction } from '../../models/basic-vehicle-auction.model';

export const BasicVehicleAuctionMock: BasicVehicleAuction = {
  associatedVehicle: {
    make: 'mockMake',
    ez: 'mockEz',
    mileageInKm: 1000,
    fuelType: 1,
    transmission: 1,
    vehicleImages: [{ url: '/assets/logo.svg' }],
  },
  currentHighestBidValue: 1000,
  amIHighestBidder: false,
  remainingTimeInSeconds: 1000,
};
