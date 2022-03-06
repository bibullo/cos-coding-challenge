import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuctionsOverviewComponent } from './auctions-overview/auctions-overview.component';

const routes: Routes = [{ path: '', component: AuctionsOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
