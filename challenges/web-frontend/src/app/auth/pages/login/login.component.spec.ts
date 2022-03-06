import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthQuery } from '../../store/auth.query';
import { AuthQueryMock } from '../../store/mocks/auth.query.mock';

import { AuthService } from '../../store/auth.service';
import { AuthServiceMock } from '../../store/mocks/auth.service.mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AuthQuery, useValue: new AuthQueryMock(false, false) },
      ],
    }).compileComponents();
  });

  describe('generic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a loading$ observable', () => {
      const authQuery = TestBed.inject(AuthQuery);

      expect(component.loading$).toBe(authQuery.loading$);
    });

    it('should have a onSubmit function', () => {
      const authService = TestBed.inject(AuthService);

      const loginSpy = jest.spyOn(authService, 'login');
      const markAsTouchedSpy = jest.spyOn(
        component.loginForm,
        'markAllAsTouched'
      );

      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      component.onSubmit();

      expect(loginSpy).not.toHaveBeenCalled();
      expect(markAsTouchedSpy).toHaveBeenCalled();

      markAsTouchedSpy.mockReset();
      emailControl?.setValue('mockEmail');

      component.onSubmit();

      expect(loginSpy).not.toHaveBeenCalled();
      expect(markAsTouchedSpy).toHaveBeenCalled();

      markAsTouchedSpy.mockReset();
      passwordControl?.setValue('mockPassword');

      component.onSubmit();

      expect(loginSpy).toHaveBeenCalledWith('mockEmail', 'mockPassword');
      expect(markAsTouchedSpy).not.toHaveBeenCalled();
    });
  });

  describe('when not loading', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call onSubmit for button clicks', () => {
      const onSubmitSpy = jest.spyOn(component, 'onSubmit');

      const button = fixture.debugElement.query(By.css('.c-login__button'));

      button.nativeElement.click();
      expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should have a login label and no spinner when loading is false', () => {
      const spinner = fixture.debugElement.query(By.css('.c-login__spinner'));
      const button = fixture.debugElement.query(By.css('.c-login__button'));

      expect(spinner).toBeNull();
      expect(button.nativeElement.textContent.trim()).toBe('Login');
    });
  });

  describe('when loading', () => {
    beforeEach(() => {
      TestBed.overrideProvider(AuthQuery, {
        useValue: new AuthQueryMock(true, false),
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have a disabled attribute while loading', () => {
      const button = fixture.debugElement.query(By.css('.c-login__button'));

      expect(button.nativeElement.disabled).toEqual(true);
    });

    it('should have a mat spinner while loading', () => {
      const spinner = fixture.debugElement.query(By.css('.c-login__spinner'));

      expect(spinner).not.toBeNull();
    });

    it('should not call onSubmit for button clicks while loading', () => {
      const onSubmitSpy = jest.spyOn(component, 'onSubmit');

      const button = fixture.debugElement.query(By.css('.c-login__button'));

      button.nativeElement.click();
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });
  });
});
