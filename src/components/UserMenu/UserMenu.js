import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { resetUser } from 'redux/reducer';
import {
  useLogOutUserMutation,
  useChangeAvatarMutation,
} from 'redux/contactsAPI';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { store } from 'redux/store';
import { getToken, getAvatar, getSubscription, getName } from 'redux/selectors';
import { contactsApi } from 'redux/contactsAPI';
import AvatarComponent from 'components/Avatar';
import SubscriptionRadioButton from 'components/SubscriptionRadioButton';
import s from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const [logOutUser] = useLogOutUserMutation();
  const [setAvatar] = useChangeAvatarMutation();
  const token = useSelector(getToken);
  const name = useSelector(getName);
  const avatar = useSelector(getAvatar);
  const subscription = useSelector(getSubscription);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleFileInput = async e => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
      toast.error('Avatar shoude be image', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const formData = new FormData();
    formData.append('avatar', file);
    await setAvatar(formData).unwrap();
  };

  return (
    <>
      <ul className={s.hederList}>
        <li className={s.userProfileLink}>
          <Tooltip title="Change avatar">
            <label className={s.avatar}>
              <AvatarComponent avatar={avatar} />
              <input
                type="file"
                className={s.visuallyHidden}
                onChange={handleFileInput}
              />
            </label>
          </Tooltip>
          <div className={s.userInfoWrap}>
            <p className={s.name}>{name}</p>
            <Tooltip title="Change subscription">
              <p className={s.subscription} onClick={handleClick}>
                Subscription: {subscription}
              </p>
            </Tooltip>
          </div>
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <SubscriptionRadioButton onClose={handleClose} />
      </Popover>
    </>
  );
}
