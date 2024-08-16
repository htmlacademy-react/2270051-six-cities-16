import {useAppSelector} from './redux-hooks';
import {User} from '../lib/types/review';
import {RootState} from '../store';
import {AuthorizationStatus} from '../const';

export function useUser(): {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  authorizationUser?: User;
  } {
  const authorizationStatus = useAppSelector((state:RootState) => state.user.authorizationStatus);
  const authorizationUser = useAppSelector((state: RootState) => state.user.authorizationUser);

  return {authorizationStatus, authorizationUser};
}
