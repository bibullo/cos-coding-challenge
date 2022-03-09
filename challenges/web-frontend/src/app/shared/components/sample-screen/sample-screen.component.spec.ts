import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { SampleScreenComponent } from './sample-screen.component';

describe('SampleScreenComponent', () => {
  let component: SampleScreenComponent;
  let fixture: ComponentFixture<SampleScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleScreenComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                title: 'mockTitle',
                subtitle: 'mockSubtitle',
                illustration: 'mockIllustration',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title equal to route data', () => {
    const title = fixture.debugElement.query(By.css('.c-sample-screen__title'));

    const expectedTitle = 'mockTitle';

    expect(title.nativeElement.textContent).toBe(expectedTitle);
  });

  it('should have a subtitle equal to route data', () => {
    const subtitle = fixture.debugElement.query(
      By.css('.c-sample-screen__subtitle')
    );

    const expectedSubtitle = 'mockSubtitle';

    expect(subtitle.nativeElement.textContent).toBe(expectedSubtitle);
  });

  it('should have an illustration equal to route data', () => {
    const illustration = fixture.debugElement.query(
      By.css('.c-sample-screen__illustration')
    );

    const expectedIllustration = 'mockIllustration';

    expect(illustration.nativeElement.getAttribute('src')).toBe(
      expectedIllustration
    );
  });
});
