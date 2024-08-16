import {useAppSelector} from './redux-hooks';
import {RootState} from '../store';
import {AuthorizationStatus} from '../const';
import {AuthorizationUser} from '../lib/types/user';

export function useUser(): {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  authorizationUser?: AuthorizationUser;
  } {
  const authorizationStatus = useAppSelector((state:RootState) => state.user.authorizationStatus);
  const authorizationUser = useAppSelector((state: RootState) => state.user.authorizationUser);

  return {authorizationStatus, authorizationUser};
}
