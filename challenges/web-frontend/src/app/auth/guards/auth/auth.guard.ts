import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable, of, switchMap, take } from 'rxjs';

import { AuthUser } from '../../models/auth-user.model';
import { AuthQuery } from '../../store/auth.query';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  readonly user$: Observable<AuthUser>;

  constructor(private authQuery: AuthQuery, private router: Router) {
    this.user$ = this.authQuery.user$;
  }

  canActivate(): Observable<boolean> {
    return this.user$.pipe(
      take(1),
      switchMap((user: AuthUser) => {
        if (user.authenticated) {
          this.router.navigate(['']);
          return of(false);
        }

        return of(true);
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.user$.pipe(
      take(1),
      switchMap((user: AuthUser) => {
        if (!user.authenticated) {
          this.router.navigate(['/404']);
          return of(false);
        }

        return of(true);
      })
    );
  }
}
