import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  readonly loading$: Observable<boolean>;
  readonly user$: Observable<AuthUser>;

  constructor(protected override store: AuthStore) {
    super(store);

    this.loading$ = this.select('loading');
    this.user$ = this.select('user');
  }
}
