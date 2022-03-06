import { Observable, of } from 'rxjs';
import { AuthUser } from '../../models/auth-user.model';
import { authUserMock } from './auth-user.mock';

export class AuthQueryMock {
  readonly loading$: Observable<boolean>;
  readonly user$: Observable<AuthUser>;

  constructor() {
    this.loading$ = of(false);
    this.user$ = of(authUserMock);
  }
}
