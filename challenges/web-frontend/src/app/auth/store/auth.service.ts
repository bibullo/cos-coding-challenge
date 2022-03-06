import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';

import { environment } from '../../../environments/environment';
import { AuthUser } from '../models/auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private http: HttpClient) {}

  login(userMailId: string, password: string): void {
    this.authStore.updateLoadingState(true);

    const url = `${environment.apiUrl}/authentication/${userMailId}`;

    const body = {
      password: password,
      meta: 'string',
    };

    this.http.put<AuthUser>(url, body).subscribe((response: AuthUser) => {
      this.authStore.updateAuthUser(response);
      this.authStore.updateLoadingState(false);
    });
  }

  logout(): void {
    this.authStore.reset();
  }
}
