import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable, of, switchMap, take } from 'rxjs';

import { AuthUser } from '../../models/auth-user.model';
import { AuthQuery } from '../../store/auth.query';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  readonly user$: Observable<AuthUser>;

  constructor(private authQuery: AuthQuery, private router: Router) {
    this.user$ = this.authQuery.user$;
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = route.data['allowedRoles'];

    if (!allowedRoles) {
      return this.denyAccess();
    }

    return this.user$.pipe(
      take(1),
      switchMap((user: AuthUser) => {
        const userRoles = user.privileges.toLowerCase();

        if (!userRoles) {
          return this.denyAccess();
        }

        let allowed: boolean = false;

        allowedRoles.forEach((role: string) => {
          if (userRoles.includes(role.toLowerCase())) {
            allowed = true;
          }
        });

        if (allowed) {
          return of(true);
        }

        return this.denyAccess();
      })
    );
  }

  denyAccess(): Observable<boolean> {
    this.router.navigate(['/404']);
    return of(false);
  }
}
