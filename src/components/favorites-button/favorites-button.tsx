import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {addToFavorites, removeFromFavorites} from '../../store/offers-slice/offers-thunk';
import {AppRoute, AuthorizationStatus} from '../../const';
import classNames from 'classnames';

type FavoritesButtonProps = {
  offerId: string;
  isFavorite: boolean;
  buttonClassName: string;
  iconClassName: string;
  iconWidth: string;
  iconHeight: string;
};

function FavoritesButton({ offerId, isFavorite, buttonClassName, iconClassName, iconWidth, iconHeight }: FavoritesButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(offerId));
    } else {
      dispatch(addToFavorites(offerId));
    }
  };

  return (
    <button
      className={classNames(buttonClassName, 'button', { [`${buttonClassName}--active`]: isFavorite })}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={iconClassName} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoritesButton;
