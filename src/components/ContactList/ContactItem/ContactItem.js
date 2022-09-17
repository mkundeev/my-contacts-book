import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  AiOutlineClose,
  AiFillSetting,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import ClipLoader from 'react-spinners/ClipLoader';
import s from './ContactItem.module.css';
import {
  useDeleteContactMutation,
  usePatchContactMutation,
  useGetContactsQuery,
  useSetFavoriteContactMutation,
} from 'redux/contactsAPI';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import ContactForm from 'components/ContactForm';
import { toast } from 'react-toastify';

export default function ContactItem({ name, phone, id, email, favorite }) {
  const [deletContact, { isLoading }] = useDeleteContactMutation();
  const [changeContact] = usePatchContactMutation();
  const [setFavoriteContact] = useSetFavoriteContactMutation();
  const { data } = useGetContactsQuery();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFavorite = () => {
    setFavoriteContact({ favorite: !favorite, contactId: id });
  };

  const onContactChange = contact => {
    if (data.some(({ name }) => name === contact.name)) {
      toast.error(`${contact.name} is already in contacts`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!contact.name && !contact.phone && !contact.email) {
      handleClose();
      return;
    }
    !contact.name && (contact.name = name);
    !contact.phone && (contact.phone = phone);
    !contact.email && (contact.email = email);
    changeContact({ contact, contactId: id });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={s.buttonWrap}>
        <Tooltip title="Add to favorite">
          <button onClick={setFavorite} type="button" className={s.button}>
            {favorite ? (
              <AiFillStar className={s.isFavorite} />
            ) : (
              <AiOutlineStar className={s.isFavorite} />
            )}
          </button>
        </Tooltip>
        <div className={s.innerButtonWrap}>
          <Tooltip title="Change details">
            <button onClick={handleClick} type="button" className={s.button}>
              <AiFillSetting />
            </button>
          </Tooltip>
          <Tooltip title="Delete contact">
            <button
              onClick={() => deletContact(id)}
              type="button"
              className={s.button}
            >
              {isLoading ? (
                <ClipLoader size="16px" color="white" />
              ) : (
                <AiOutlineClose />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
      <div className={s.contactWrap}>
        <span className={s.number}>Phone: {phone}</span>
        <span className={s.email}>E-mail: {email}</span>
      </div>

      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <ContactForm
          name={name}
          phone={phone}
          email={email}
          changeData
          onSubmit={onContactChange}
        />
      </Popover>
    </>
  );
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};
