import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimeLeftPipe } from 'src/app/shared/pipes/time-left.pipe';

import { fuelType } from '../../models/fuel-type.model';
import { transmissionType } from '../../models/transmission-type.model';

import { BasicVehicleAuctionMock } from '../../store/mocks/auction.mock';

import { AuctionCardComponent } from './auction-card.component';

describe('AuctionCardComponent', () => {
  let component: AuctionCardComponent;
  let fixture: ComponentFixture<AuctionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCardComponent, TimeLeftPipe],
    }).compileComponents();
  });

  describe('deterministic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AuctionCardComponent);
      component = fixture.componentInstance;

      component.auction = BasicVehicleAuctionMock;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have `mileage` formatted with number pipe', () => {
      const mileageInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--mileage')
      );

      const expectedAuctionValue = 100000;
      const expectedFormattedInfo = '100,000';

      expect(component.auction.associatedVehicle.mileageInKm).toBe(
        expectedAuctionValue
      );
      expect(mileageInfo.nativeElement.textContent).toBe(expectedFormattedInfo);
    });

    it('should have `current highest bid` formatted with currency pipe', () => {
      const bidInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--bid')
      );

      const expectedAuctionValue = 1000;
      const expectedFormattedInfo = '€1,000';

      expect(component.auction.currentHighestBidValue).toBe(
        expectedAuctionValue
      );
      expect(bidInfo.nativeElement.textContent).toBe(expectedFormattedInfo);
    });

    it('should have `remaining auction time` formatted with timeLeft pipe', () => {
      const auctionTimeInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--time')
      );

      const expectedAuctionValue = 1000;
      const expectedFormattedInfo = '00h:16m:40s';

      expect(component.auction.remainingTimeInSeconds).toBe(
        expectedAuctionValue
      );
      expect(auctionTimeInfo.nativeElement.textContent).toBe(
        expectedFormattedInfo
      );
    });

    it('should proper fuel type info', () => {
      const fuelTypeInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--fuel')
      );

      const expectedAuctionValue = 1;
      const expectedFuelInfo = fuelType[expectedAuctionValue];

      expect(component.auction.associatedVehicle.fuelType).toBe(
        expectedAuctionValue
      );
      expect(fuelTypeInfo.nativeElement.textContent).toBe(expectedFuelInfo);
    });

    it('should proper transmission type info', () => {
      const transmissionTypeInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--transmission')
      );

      const expectedAuctionValue = 1;
      const expectedTransmissionTypeInfo =
        transmissionType[expectedAuctionValue];

      expect(component.auction.associatedVehicle.transmission).toBe(
        expectedAuctionValue
      );
      expect(transmissionTypeInfo.nativeElement.textContent).toBe(
        expectedTransmissionTypeInfo
      );
    });

    it('should have fuelTypes and transmissionTypes objects', () => {
      expect(component.fuelTypes).toBe(fuelType);
      expect(component.transmissionTypes).toBe(transmissionType);
    });

    it('should have 2 `infos` and 8 `info` elements', () => {
      const infosElements = fixture.debugElement.queryAll(
        By.css('.c-auction-card__infos')
      );

      const infoElements = fixture.debugElement.queryAll(
        By.css('.c-auction-card__info')
      );

      expect(infosElements.length).toBe(2);
      expect(infoElements.length).toBe(8);
    });
  });

  describe('dynamic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AuctionCardComponent);
      component = fixture.componentInstance;

      component.auction = BasicVehicleAuctionMock;
    });

    it('should load image when it`s provided', () => {
      fixture.detectChanges();

      const imgElement = fixture.debugElement.query(
        By.css('.c-auction-card__image')
      );

      const expectedSrc = 'mockImage';
      expect(imgElement.nativeElement.getAttribute('src')).toBe(expectedSrc);
    });

    it('should load logo from assets when default image is provided', () => {
      component.auction.associatedVehicle.vehicleImages[0]['url'] =
        'https://app.caronsale.de/assets/logo/cos/logo-solid.png';
      fixture.detectChanges();

      const imgElement = fixture.debugElement.query(
        By.css('.c-auction-card__image')
      );

      const expectedSrc = '/assets/logo.svg';

      expect(imgElement.nativeElement.getAttribute('src')).toBe(expectedSrc);
    });

    it('should have a `No` current highest bidder', () => {
      fixture.detectChanges();

      const highestBidderInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--highest')
      );

      let expectedAuctionValue = false;
      let expectedHighestBidderInfo = 'No';

      expect(component.auction.amIHighestBidder).toBe(expectedAuctionValue);
      expect(highestBidderInfo.nativeElement.textContent).toBe(
        expectedHighestBidderInfo
      );
    });

    it('should have a `Yes` current highest bidder', () => {
      component.auction.amIHighestBidder = true;
      fixture.detectChanges();

      const highestBidderInfo = fixture.debugElement.query(
        By.css('.c-auction-card__info--highest')
      );

      let expectedAuctionValue = true;
      let expectedHighestBidderInfo = 'Yes';

      expect(component.auction.amIHighestBidder).toBe(expectedAuctionValue);
      expect(highestBidderInfo.nativeElement.textContent).toBe(
        expectedHighestBidderInfo
      );
    });
  });
});
