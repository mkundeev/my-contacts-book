import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from 'redux/reducer';
import { useLogOutUserMutation } from 'redux/contactsAPI';
import { Avatar } from '@mui/material';
import stringAvatar from 'utilits/Avatar';
import s from './UserMenu.module.css';
import { store } from 'redux/store';
import { getToken, getName, getEmail } from 'redux/selectors';
import { contactsApi } from 'redux/contactsAPI';

export default function UserMenu() {
  const dispatch = useDispatch();
  const [logOutUser] = useLogOutUserMutation();
  const token = useSelector(getToken);
  const name = useSelector(getName);
  const email = useSelector(getEmail);

  return (
    <ul className={s.hederList}>
      <li className={s.userProfileLink}>
        <Avatar {...stringAvatar(name.toUpperCase())} /> <span>{email}</span>
      </li>
      <li className={s.hederListItem}>
        <button
          type="button"
          className={s.button}
          onClick={() =>
            logOutUser(token)
              .unwrap()
              .then(() => {
                dispatch(resetUser());
                store.dispatch(contactsApi.util.resetApiState());
              })
          }
        >
          Log out
        </button>
      </li>
    </ul>
  );
}
