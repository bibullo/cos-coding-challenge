import { AuthStore } from './auth.store';
import { authUserMock } from './mocks/auth-user.mock';

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    store = new AuthStore();
  });

  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });

  it('should have a updateLoadingState function', () => {
    const updateSpy = jest.spyOn(store, 'update');

    store.updateLoadingState(true);

    expect(updateSpy).toHaveBeenLastCalledWith({ loading: true });
  });

  it('should have a updateAuthUser function', () => {
    const updateSpy = jest.spyOn(store, 'update');

    store.updateAuthUser(authUserMock);

    expect(updateSpy).toHaveBeenLastCalledWith({ user: authUserMock });
  });
});
