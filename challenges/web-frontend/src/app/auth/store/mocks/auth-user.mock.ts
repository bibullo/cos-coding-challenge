import { AuthUser } from '../../models/auth-user.model';

export const authUserMock: AuthUser = {
  token: 'mockToken',
  authenticated: true,
  userId: 'mockId',
  internalUserId: 123,
  internalUserUUID: 'mockUuid',
  type: 1,
  privileges: 'mockPrivileges',
};
