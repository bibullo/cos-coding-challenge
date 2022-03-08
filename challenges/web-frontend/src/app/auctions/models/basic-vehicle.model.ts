export interface BasicVehicle {
  make: string;
  ez: string;
  mileageInKm: number;
  fuelType: number;
  transmission: number;
  vehicleImages: Record<string, unknown>[];
}
