import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthQuery } from '../../store/auth.query';
import { AuthQueryMock } from '../../store/mocks/auth.query.mock';

import { AuthGuard } from './auth.guard';

@Component({})
class DumbComponent {}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '404', component: DumbComponent },
        ]),
      ],
      providers: [
        { provide: AuthQuery, useValue: new AuthQueryMock(false, true) },
      ],
    });
  });

  describe('generic', () => {
    beforeEach(() => {
      guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });
  });

  describe('authenticated user', () => {
    beforeEach(() => {
      guard = TestBed.inject(AuthGuard);
    });

    it('should not allow authenticated users on canActivate', (done: jest.DoneCallback) => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      const res$ = guard.canActivate();

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(routerSpy).toHaveBeenCalledWith(['']);
        done();
      });
    });

    it('should allow authenticated users on canLoad', (done: jest.DoneCallback) => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      const res$ = guard.canLoad();

      res$.subscribe((allowed) => {
        expect(allowed).toBe(true);
        expect(routerSpy).not.toHaveBeenCalledWith(['/404']);
        done();
      });
    });
  });

  describe('unauthenticated user', () => {
    beforeEach(() => {
      TestBed.overrideProvider(AuthQuery, {
        useValue: new AuthQueryMock(false, false),
      });

      guard = TestBed.inject(AuthGuard);
    });

    it('should allow unauthenticated users on canActivate', (done: jest.DoneCallback) => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      const res$ = guard.canActivate();

      res$.subscribe((allowed) => {
        expect(allowed).toBe(true);
        expect(routerSpy).not.toHaveBeenCalledWith(['']);
        done();
      });
    });

    it('should not allow unauthenticated users on canLoad', (done: jest.DoneCallback) => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      const res$ = guard.canLoad();

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(routerSpy).toHaveBeenCalledWith(['/404']);
        done();
      });
    });
  });
});
