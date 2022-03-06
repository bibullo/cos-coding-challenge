import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsOverviewComponent } from './auctions-overview.component';

describe('AuctionsOverviewComponent', () => {
  let component: AuctionsOverviewComponent;
  let fixture: ComponentFixture<AuctionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionsOverviewComponent],
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
});
