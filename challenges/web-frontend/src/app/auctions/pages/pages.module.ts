import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

import { AuctionsOverviewComponent } from './auctions-overview/auctions-overview.component';

@NgModule({
  declarations: [AuctionsOverviewComponent],
  imports: [CommonModule, PagesRoutingModule, ComponentsModule],
})
export class PagesModule {}
