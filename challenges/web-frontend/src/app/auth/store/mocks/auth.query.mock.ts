import { Observable, of } from 'rxjs';
import { AuthUser } from '../../models/auth-user.model';
import { authUserMock } from './auth-user.mock';

export class AuthQueryMock {
  user$: Observable<AuthUser>;

  constructor() {
    this.user$ = of(authUserMock);
  }
}
