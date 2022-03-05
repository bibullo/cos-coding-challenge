import { AuthQuery } from './auth.query';
import { AuthStore } from './auth.store';

describe('AuthQuery', () => {
  let query: AuthQuery;

  beforeEach(() => {
    query = new AuthQuery(new AuthStore());
  });

  it('should create an instance', () => {
    expect(query).toBeTruthy();
  });

  it('should have a user$ observable', () => {
    expect(query.user$).toBeDefined();
  });
});
