import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthUser } from '../models/auth-user.model';

export interface AuthState {
  user: AuthUser;
}

export function createInitialState(): AuthState {
  return {
    user: {
      token: '',
      authenticated: false,
      userId: '',
      internalUserId: 0,
      internalUserUUID: '',
      type: 0,
      privileges: '',
    },
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }

  updateAuthUser(user: AuthUser): void {
    this.update({ user });
  }
}
