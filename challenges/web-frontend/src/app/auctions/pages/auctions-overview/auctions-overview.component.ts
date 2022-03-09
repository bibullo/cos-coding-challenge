import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, takeUntil, timer } from 'rxjs';

import { BasicVehicleAuction } from '../../models/basic-vehicle-auction.model';

import { AuctionsQuery } from '../../store/auctions.query';
import { AuctionsService } from '../../store/auctions.service';

@Component({
  selector: 'cos-auctions-overview',
  templateUrl: './auctions-overview.component.html',
  styleUrls: ['./auctions-overview.component.scss'],
})
export class AuctionsOverviewComponent implements OnInit, OnDestroy {
  readonly unsubscribe$: Subject<void>;
  readonly auctions$: Observable<BasicVehicleAuction[]>;

  constructor(
    private auctionsService: AuctionsService,
    private auctionsQuery: AuctionsQuery
  ) {
    this.unsubscribe$ = new Subject();
    this.auctions$ = this.auctionsQuery.auctions$;
  }

  ngOnInit() {
    timer(0, 20000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.auctionsService.getBuyerAuctions();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
