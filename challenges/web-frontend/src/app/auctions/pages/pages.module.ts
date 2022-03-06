import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { AuctionsOverviewComponent } from './auctions-overview/auctions-overview.component';

@NgModule({
  declarations: [AuctionsOverviewComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
