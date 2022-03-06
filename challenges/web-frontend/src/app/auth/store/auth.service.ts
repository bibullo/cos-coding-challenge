import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { AuthUser } from '../models/auth-user.model';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
    private router: Router
  ) {}

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
      this.router.navigate(['/auctions']);
    });
  }

  logout(): void {
    this.authStore.reset();
    this.router.navigate(['']);
  }
}
