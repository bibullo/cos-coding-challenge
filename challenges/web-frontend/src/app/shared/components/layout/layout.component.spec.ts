import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { authUserMock } from 'src/app/auth/store/mocks/auth-user.mock';

import { AuthQuery } from 'src/app/auth/store/auth.query';
import { AuthQueryMock } from 'src/app/auth/store/mocks/auth.query.mock';

import { AuthService } from 'src/app/auth/store/auth.service';
import { AuthServiceMock } from 'src/app/auth/store/mocks/auth.service.mock';

import { LayoutComponent } from './layout.component';

@Component({})
class DumbComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, DumbComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: DumbComponent },
          { path: 'login', component: DumbComponent },
          { path: 'auctions', component: DumbComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AuthQuery, useValue: new AuthQueryMock(false, false) },
      ],
    }).compileComponents();
  });

  describe('generic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a user$ observable', () => {
      const authQuery = TestBed.inject(AuthQuery);

      expect(component.user$).toBe(authQuery.user$);
    });

    it('should have a navigateToRoot function', () => {
      const router = TestBed.inject(Router);

      const routerSpy = jest.spyOn(router, 'navigate');

      component.navigateToRoot();

      expect(routerSpy).toHaveBeenCalledWith(['']);
    });

    it('should have a onLogin function', () => {
      const router = TestBed.inject(Router);

      const routerSpy = jest.spyOn(router, 'navigate');

      component.onLogin();

      expect(routerSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should have a onLogout function', () => {
      const authService = TestBed.inject(AuthService);

      const logoutSpy = jest.spyOn(authService, 'logout');
      const navigateSpy = jest.spyOn(component, 'navigateToRoot');

      component.onLogout();

      expect(logoutSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should have a onAuctions function', () => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      component.onAuctions();

      expect(routerSpy).toHaveBeenCalledWith(['/auctions']);
    });

    it('should have a header', () => {
      const header = fixture.debugElement.query(By.css('.c-layout__header'));

      expect(header).not.toBeNull();
    });

    it('should have a logo', () => {
      const logo = fixture.debugElement.query(By.css('.c-layout__header-logo'));

      expect(logo).not.toBeNull();
    });

    it('should call navigateToRoot on logo click', () => {
      const navigateSpy = jest.spyOn(component, 'navigateToRoot');

      const logo = fixture.debugElement.query(By.css('.c-layout__header-logo'));

      logo.nativeElement.click();

      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('unauthenticated user', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not have an auctions button for unauthenticated users', () => {
      const auctionsButton = fixture.debugElement.query(
        By.css('.c-layout__auctions-button')
      );

      expect(auctionsButton).toBeNull();
    });

    it('should have a login button for unauthenticated users', () => {
      const loginButton = fixture.debugElement.query(
        By.css('.c-layout__login-button')
      );

      const logoutButton = fixture.debugElement.query(
        By.css('.c-layout__logout-button')
      );

      expect(logoutButton).toBeNull();
      expect(loginButton).not.toBeNull();
      expect(loginButton.nativeElement.textContent.trim()).toBe('Login');
    });

    it('should call onLogin for login button click', () => {
      const loginSpy = jest.spyOn(component, 'onLogin');

      const loginButton = fixture.debugElement.query(
        By.css('.c-layout__login-button')
      );

      loginButton.nativeElement.click();

      expect(loginSpy).toHaveBeenCalled();
    });
  });

  describe('authenticated user', () => {
    beforeEach(() => {
      TestBed.overrideProvider(AuthQuery, {
        useValue: new AuthQueryMock(false, true),
      });

      fixture = TestBed.createComponent(LayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not have an auctions button for authenticated users without salesman privileges', () => {
      const auctionsButton = fixture.debugElement.query(
        By.css('.c-layout__auctions-button')
      );

      expect(auctionsButton).toBeNull();
    });

    it('should have an auctions button for authenticated users with salesman privileges', () => {
      const salesmanUser = { ...authUserMock, privileges: '{SALESMAN_USER}' };
      Object.defineProperty(component, 'user$', { value: of(salesmanUser) });

      fixture.detectChanges();

      const auctionsButton = fixture.debugElement.query(
        By.css('.c-layout__auctions-button')
      );

      expect(auctionsButton).not.toBeNull();
      expect(auctionsButton.nativeElement.textContent.trim()).toBe('Auctions');
    });

    it('should call onAuctions for auctions button click', () => {
      const salesmanUser = { ...authUserMock, privileges: '{SALESMAN_USER}' };
      Object.defineProperty(component, 'user$', { value: of(salesmanUser) });

      fixture.detectChanges();

      const onAuctionsSpy = jest.spyOn(component, 'onAuctions');
      const auctionsButton = fixture.debugElement.query(
        By.css('.c-layout__auctions-button')
      );

      auctionsButton.nativeElement.click();
      expect(onAuctionsSpy).toHaveBeenCalled();
    });

    it('should have a logout button for authenticated users', () => {
      const logoutButton = fixture.debugElement.query(
        By.css('.c-layout__logout-button')
      );

      const loginButton = fixture.debugElement.query(
        By.css('.c-layout__login-button')
      );

      expect(loginButton).toBeNull();
      expect(logoutButton).not.toBeNull();
      expect(logoutButton.nativeElement.textContent.trim()).toBe('Logout');
    });

    it('should call onLogout for logout button click', () => {
      const logoutSpy = jest.spyOn(component, 'onLogout');

      const logoutButton = fixture.debugElement.query(
        By.css('.c-layout__logout-button')
      );

      logoutButton.nativeElement.click();

      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});
