import { Observable, of } from 'rxjs';
import { AuthUser } from '../../models/auth-user.model';
import { authUserMock, nullUserMock } from './auth-user.mock';

export class AuthQueryMock {
  readonly loading$: Observable<boolean>;
  readonly user$: Observable<AuthUser>;

  constructor(private isLoading: boolean, private isAuthenticated: boolean) {
    this.loading$ = of(this.isLoading);
    this.user$ = of(this.isAuthenticated ? authUserMock : nullUserMock);
  }
}
