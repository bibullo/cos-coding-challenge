import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';
import { environment } from '../../../environments/environment';
import { authUserMock } from './mocks/auth-user.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let authStore: AuthStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AuthStore],
      imports: [HttpClientTestingModule],
    });

    authService = TestBed.inject(AuthService);
    authStore = TestBed.inject(AuthStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeDefined();
  });

  it('should have a login function', () => {
    const expectedBody = { password: 'mockPassword', meta: 'string' };
    const expectedUrl = `${environment.apiUrl}/authentication/mockUserId`;
    const storeSpy = jest.spyOn(authStore, 'updateAuthUser');

    authService.login('mockUserId', 'mockPassword');

    const mockRequest = httpMock.expectOne(expectedUrl);
    mockRequest.flush(authUserMock);

    expect(mockRequest.request.method).toBe('PUT');
    expect(mockRequest.request.body).toEqual(expectedBody);
    expect(storeSpy).toBeCalledWith(authUserMock);
  });

  it('should have a logout function', () => {
    const storeSpy = jest.spyOn(authStore, 'reset');

    authService.logout();

    expect(storeSpy).toHaveBeenCalled();
  });
});
