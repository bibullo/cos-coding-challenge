import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { TimeLeftPipe } from 'src/app/shared/pipes/time-left.pipe';

import { AuctionsQuery } from '../../store/auctions.query';
import { AuctionsQueryMock } from '../../store/mocks/auctions.query.mock';

import { AuctionsService } from '../../store/auctions.service';
import { AuctionsServiceMock } from '../../store/mocks/auctions.service.mock';

import { BasicVehicleAuctionMock } from '../../store/mocks/auction.mock';

import { AuctionsOverviewComponent } from './auctions-overview.component';
import { AuctionCardComponent } from '../../components/auction-card/auction-card.component';

describe('AuctionsOverviewComponent', () => {
  let component: AuctionsOverviewComponent;
  let fixture: ComponentFixture<AuctionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuctionsOverviewComponent,
        AuctionCardComponent,
        TimeLeftPipe,
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuctionsService, useClass: AuctionsServiceMock },
        { provide: AuctionsQuery, useClass: AuctionsQueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an auctions$ observable', () => {
    const auctionsQuery = TestBed.inject(AuctionsQuery);

    expect(component.auctions$).toBe(auctionsQuery.auctions$);
  });

  it('should call getBuyerAuctions on init as well as 20s thereafter and so on', () => {
    jest.useFakeTimers();

    const auctionsService = TestBed.inject(AuctionsService);
    const getBuyerAuctionsSpy = jest.spyOn(auctionsService, 'getBuyerAuctions');

    component.ngOnInit();
    jest.advanceTimersByTime(0);

    expect(getBuyerAuctionsSpy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(20000);

    expect(getBuyerAuctionsSpy).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(20000);

    expect(getBuyerAuctionsSpy).toHaveBeenCalledTimes(3);

    jest.useRealTimers();
  });

  it('should call for next and complete on destroy', () => {
    const nextSpy = jest.spyOn(component.unsubscribe$, 'next');
    const completeSpy = jest.spyOn(component.unsubscribe$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not render any card if auctions are empty', () => {
    Object.defineProperty(component, 'auctions$', { value: of([]) });

    fixture.detectChanges();

    const auctionCards = fixture.debugElement.queryAll(
      By.css('.c-auctions-overview__card')
    );

    expect(auctionCards.length).toBe(0);
  });

  it('should render as many cards as there are auctions', () => {
    let auctionCards = fixture.debugElement.queryAll(
      By.css('.c-auctions-overview__card')
    );

    expect(auctionCards.length).toBe(1);

    Object.defineProperty(component, 'auctions$', {
      value: of([
        BasicVehicleAuctionMock,
        BasicVehicleAuctionMock,
        BasicVehicleAuctionMock,
      ]),
    });

    fixture.detectChanges();

    auctionCards = fixture.debugElement.queryAll(
      By.css('.c-auctions-overview__card')
    );

    expect(auctionCards.length).toBe(3);
  });
});
