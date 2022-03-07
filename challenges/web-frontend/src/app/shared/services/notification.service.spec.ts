import { TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatSnackBarModule],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a openSnackBar function', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const openSnackBarSpy = jest.spyOn(snackBar, 'open');

    service.openSnackBar('message');

    expect(openSnackBarSpy).toHaveBeenCalledWith('message', 'close', {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  });
});
