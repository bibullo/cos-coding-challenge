import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthQuery } from '../../store/auth.query';
import { AuthService } from '../../store/auth.service';

@Component({
  selector: 'cos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  readonly loading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authQuery: AuthQuery
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loading$ = this.authQuery.loading$;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValues = this.loginForm.getRawValue();

    this.authService.login(formValues.email, formValues.password);
  }
}
