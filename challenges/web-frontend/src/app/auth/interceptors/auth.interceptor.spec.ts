import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';

import { AuthQuery } from '../store/auth.query';
import { AuthQueryMock } from '../store/mocks/auth.query.mock';

import { AuthService } from '../store/auth.service';
import { AuthServiceMock } from '../store/mocks/auth.service.mock';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AuthQuery, useValue: new AuthQueryMock(false, true) },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
  });

  describe('generic', () => {
    beforeEach(() => {
      interceptor = TestBed.inject(AuthInterceptor);
      http = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(interceptor).toBeTruthy();
    });

    it('should have a user$ observable', () => {
      const authQuery = TestBed.inject(AuthQuery);

      expect(interceptor.user$).toBe(authQuery.user$);
    });
  });

  describe('unauthenticated user', () => {
    beforeEach(() => {
      TestBed.overrideProvider(AuthQuery, {
        useValue: new AuthQueryMock(false, false),
      });

      interceptor = TestBed.inject(AuthInterceptor);
      http = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should not add empty headers if user inst authenticated', (done: jest.DoneCallback) => {
      http.get('/mockUrl').subscribe(() => {
        done();
      });

      const mockRequest = httpMock.expectOne('/mockUrl');
      mockRequest.flush({});

      expect(mockRequest.request.headers.get('userid')).toBeNull();
      expect(mockRequest.request.headers.get('authtoken')).toBeNull();
      httpMock.verify();
    });
  });

  describe('authenticated user', () => {
    beforeEach(() => {
      interceptor = TestBed.inject(AuthInterceptor);
      http = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add authtoken and userid headers to requests', (done: jest.DoneCallback) => {
      http.get('/mockUrl').subscribe(() => {
        done();
      });

      const mockRequest = httpMock.expectOne('/mockUrl');
      mockRequest.flush({});

      expect(mockRequest.request.headers.get('userid')).toBe('mockId');
      expect(mockRequest.request.headers.get('authtoken')).toBe('mockToken');
      httpMock.verify();
    });

    it('should logout the user on a 401 error response', (done: jest.DoneCallback) => {
      const authService = TestBed.inject(AuthService);
      const logoutSpy = jest.spyOn(authService, 'logout');

      let responseStatus: number = 500;

      http.get('/mockUrl').subscribe({
        next: () => {
          responseStatus = 200;
          done();
        },
        error: (err) => {
          {
            responseStatus = err.status;
            done();
          }
        },
      });

      const mockRequest = httpMock.expectOne('/mockUrl');

      const mockEvent: ProgressEvent = new ProgressEvent('unauthorized');
      mockRequest.error(mockEvent, { status: 401, statusText: 'unauthorized' });

      expect(responseStatus).toEqual(401);
      expect(logoutSpy).toHaveBeenCalled();
      httpMock.verify();
    });

    it('should not logout the user on other error code responses', (done: jest.DoneCallback) => {
      const authService = TestBed.inject(AuthService);
      const logoutSpy = jest.spyOn(authService, 'logout');

      let responseStatus: number = 500;

      http.get('/mockUrl').subscribe({
        next: () => {
          responseStatus = 200;
          done();
        },
        error: (err) => {
          {
            responseStatus = err.status;
            done();
          }
        },
      });

      const mockRequest = httpMock.expectOne('/mockUrl');

      const mockEvent: ProgressEvent = new ProgressEvent('forbidden');
      mockRequest.error(mockEvent, { status: 403, statusText: 'forbidden' });

      expect(responseStatus).toEqual(403);
      expect(logoutSpy).not.toHaveBeenCalled();
      httpMock.verify();
    });
  });
});
