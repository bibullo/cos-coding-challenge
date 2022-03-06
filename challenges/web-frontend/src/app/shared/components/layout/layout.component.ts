import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthUser } from 'src/app/auth/models/auth-user.model';
import { AuthQuery } from 'src/app/auth/store/auth.query';
import { AuthService } from 'src/app/auth/store/auth.service';

@Component({
  selector: 'cos-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly user$: Observable<AuthUser>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authQuery: AuthQuery
  ) {
    this.user$ = this.authQuery.user$;
  }

  navigateToRoot(): void {
    this.router.navigate(['']);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
