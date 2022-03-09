import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BasicVehicleAuction } from '../../models/basic-vehicle-auction.model';

import { fuelType } from '../../models/fuel-type.model';
import { transmissionType } from '../../models/transmission-type.model';

@Component({
  selector: 'cos-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionCardComponent {
  @Input() auction!: BasicVehicleAuction;

  readonly fuelTypes: typeof fuelType;
  readonly transmissionTypes: typeof transmissionType;

  constructor() {
    this.fuelTypes = fuelType;
    this.transmissionTypes = transmissionType;
  }
}
