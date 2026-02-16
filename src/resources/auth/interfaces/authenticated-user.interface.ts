import UserRole from '../../../database/enums/roleEnum';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}
