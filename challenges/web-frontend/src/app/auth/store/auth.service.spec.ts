import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';
import { authUserMock } from './mocks/auth-user.mock';

@Component({})
class DumbComponent {}

describe('AuthService', () => {
  let authService: AuthService;
  let authStore: AuthStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DumbComponent],
      providers: [AuthService, AuthStore],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: DumbComponent },
          { path: 'auctions', component: DumbComponent },
        ]),
      ],
    });

    authService = TestBed.inject(AuthService);
    authStore = TestBed.inject(AuthStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeDefined();
  });

  it('should have a login function', () => {
    const router = TestBed.inject(Router);

    const expectedBody = { password: 'mockPassword', meta: 'string' };
    const expectedUrl = `${environment.apiUrl}/authentication/mockUserId`;

    const storeSpy = jest.spyOn(authStore, 'updateAuthUser');
    const updateSpy = jest.spyOn(authStore, 'updateLoadingState');
    const routerSpy = jest.spyOn(router, 'navigate');

    authService.login('mockUserId', 'mockPassword');

    const mockRequest = httpMock.expectOne(expectedUrl);
    mockRequest.flush(authUserMock);

    expect(mockRequest.request.method).toBe('PUT');
    expect(mockRequest.request.body).toEqual(expectedBody);

    expect(storeSpy).toBeCalledWith(authUserMock);

    expect(updateSpy.mock.calls[0][0]).toBe(true);
    expect(updateSpy.mock.calls[1][0]).toBe(false);

    expect(routerSpy).toHaveBeenCalledWith(['/auctions']);
  });

  it('should have a logout function', () => {
    const router = TestBed.inject(Router);

    const storeSpy = jest.spyOn(authStore, 'reset');
    const routerSpy = jest.spyOn(router, 'navigate');

    authService.logout();

    expect(storeSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });
});
