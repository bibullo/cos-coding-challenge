import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AuctionCardComponent } from './auction-card/auction-card.component';

@NgModule({
  declarations: [AuctionCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [AuctionCardComponent],
})
export class ComponentsModule {}
