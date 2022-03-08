import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthQuery } from '../../store/auth.query';
import { AuthQueryMock } from '../../store/mocks/auth.query.mock';

import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthQuery, useValue: new AuthQueryMock(false, true) },
      ],
    });
  });

  describe('generic', () => {
    beforeEach(() => {
      guard = TestBed.inject(RolesGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should have a denyAccess function', (done: jest.DoneCallback) => {
      const router = TestBed.inject(Router);
      const routerSpy = jest.spyOn(router, 'navigate');

      const res$ = guard.denyAccess();

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(routerSpy).toHaveBeenCalledWith(['']);
        done();
      });
    });

    it('should not allow access if guard is used without passing allowedRoles data', (done: jest.DoneCallback) => {
      const denyAccessSpy = jest.spyOn(guard, 'denyAccess');

      const mockActivatedRouteSnapshot = { data: {} } as ActivatedRouteSnapshot;

      const res$ = guard.canActivate(mockActivatedRouteSnapshot);

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(denyAccessSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('authenticated user', () => {
    beforeEach(() => {
      guard = TestBed.inject(RolesGuard);
    });

    it('should not allow access if user doesnt have matching privileges', (done: jest.DoneCallback) => {
      const denyAccessSpy = jest.spyOn(guard, 'denyAccess');

      const mockActivatedRouteSnapshot = { data: {} } as ActivatedRouteSnapshot;
      mockActivatedRouteSnapshot.data = {
        allowedRoles: ['mockOtherPrivileges'],
      };

      const res$ = guard.canActivate(mockActivatedRouteSnapshot);

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(denyAccessSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should allow access if user have matching privileges', (done: jest.DoneCallback) => {
      const denyAccessSpy = jest.spyOn(guard, 'denyAccess');

      const mockActivatedRouteSnapshot = { data: {} } as ActivatedRouteSnapshot;
      mockActivatedRouteSnapshot.data = { allowedRoles: ['mockPrivileges'] };

      const res$ = guard.canActivate(mockActivatedRouteSnapshot);

      res$.subscribe((allowed) => {
        expect(allowed).toBe(true);
        expect(denyAccessSpy).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('unauthenticated user', () => {
    beforeEach(() => {
      TestBed.overrideProvider(AuthQuery, {
        useValue: new AuthQueryMock(false, false),
      });

      guard = TestBed.inject(RolesGuard);
    });

    it('should not allow access if user doesnt have any privileges', (done: jest.DoneCallback) => {
      const denyAccessSpy = jest.spyOn(guard, 'denyAccess');

      const mockActivatedRouteSnapshot = { data: {} } as ActivatedRouteSnapshot;
      mockActivatedRouteSnapshot.data = { allowedRoles: ['mockPrivileges'] };

      const res$ = guard.canActivate(mockActivatedRouteSnapshot);

      res$.subscribe((allowed) => {
        expect(allowed).toBe(false);
        expect(denyAccessSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
