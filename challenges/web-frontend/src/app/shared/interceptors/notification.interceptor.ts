import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.notificationError(errorResponse);

        return throwError(() => errorResponse);
      })
    );
  }

  private notificationError(errorResponse: HttpErrorResponse): void {
    const message =
      errorResponse.error && errorResponse.error.message
        ? errorResponse.error.message
        : 'an unexpected error has occurred';

    this.notificationService.openSnackBar(message);
  }
}
