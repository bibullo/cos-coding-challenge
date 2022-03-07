import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationInterceptor } from './notification.interceptor';

import { NotificationService } from '../services/notification.service';
import { NotificationServiceMock } from '../services/notification.service.mock';

describe('NotificationInterceptor', () => {
  let interceptor: NotificationInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        NotificationInterceptor,
        { provide: NotificationService, useClass: NotificationServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(NotificationInterceptor);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not call NotificationService on HttpResponse', (done: jest.DoneCallback) => {
    const notificationService = TestBed.inject(NotificationService);
    const notificationServiceSpy = jest.spyOn(
      notificationService,
      'openSnackBar'
    );

    http.get('/mockUrl').subscribe(() => {
      done();
    });

    const mockRequest = httpMock.expectOne('/mockUrl');
    mockRequest.flush({});

    expect(notificationServiceSpy).not.toHaveBeenCalled();
    httpMock.verify();
  });

  it('should call NotificationService on HttpErrorResponse and pass the error message', (done: jest.DoneCallback) => {
    const notificationService = TestBed.inject(NotificationService);
    const notificationServiceSpy = jest.spyOn(
      notificationService,
      'openSnackBar'
    );

    const mockErrorMessage = 'mockErrorMessage';

    http.get('/mockUrl').subscribe({
      next: () => {
        done();
      },
      error: () => {
        done();
      },
    });

    const mockRequest = httpMock.expectOne('/mockUrl');
    mockRequest.flush(
      { message: mockErrorMessage },
      { status: 401, statusText: 'unauthorized' }
    );

    expect(notificationServiceSpy).toHaveBeenCalledWith(mockErrorMessage);
    httpMock.verify();
  });

  it('should call NotificationService on HttpErrorResponse and use default error message', (done: jest.DoneCallback) => {
    const notificationService = TestBed.inject(NotificationService);
    const notificationServiceSpy = jest.spyOn(
      notificationService,
      'openSnackBar'
    );

    const expectedDefaultMessage = 'an unexpected error has occurred';

    http.get('/mockUrl').subscribe({
      next: () => {
        done();
      },
      error: () => {
        done();
      },
    });

    const mockRequest = httpMock.expectOne('/mockUrl');
    mockRequest.flush({}, { status: 401, statusText: 'unauthorized' });

    expect(notificationServiceSpy).toHaveBeenCalledWith(expectedDefaultMessage);
    httpMock.verify();
  });
});
