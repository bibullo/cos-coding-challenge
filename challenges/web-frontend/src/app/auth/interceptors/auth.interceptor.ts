import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthUser } from '../models/auth-user.model';
import { AuthService } from '../store/auth.service';
import { AuthQuery } from '../store/auth.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly user$: Observable<AuthUser>;

  constructor(private authService: AuthService, private authQuery: AuthQuery) {
    this.user$ = this.authQuery.user$;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.user$.pipe(
      take(1),
      switchMap((user: AuthUser) => {
        if (!user.authenticated) {
          return next.handle(request);
        }

        let headers = request.headers;

        headers = headers.set('userid', user.userId);
        headers = headers.set('authtoken', user.token);

        const requestCopy = request.clone({ headers });

        return next.handle(requestCopy);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }

        return throwError(() => error);
      })
    );
  }
}
