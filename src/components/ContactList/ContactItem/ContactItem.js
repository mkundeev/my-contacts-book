import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineClose, AiFillSetting } from 'react-icons/ai';
import ClipLoader from 'react-spinners/ClipLoader';
import s from './ContactItem.module.css';
import {
  useDeleteContactMutation,
  usePatchContactMutation,
  useGetContactsQuery,
} from 'redux/contactsAPI';
import Popover from '@mui/material/Popover';
import ContactForm from 'components/ContactForm';
import { toast } from 'react-toastify';

export default function ContactItem({ name, number, id }) {
  const [deletContact, { isLoading }] = useDeleteContactMutation();
  const [changeContact] = usePatchContactMutation();
  const { data } = useGetContactsQuery();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onContactChange = contact => {
    if (data.some(({ name }) => name === contact.name)) {
      toast.error(`${contact.name} is already in contacts`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    !contact.name && (contact.name = name);
    !contact.number && (contact.number = number);
    changeContact({ contact, contactId: id });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={s.contactWrap}>
        <span className={s.name}>{name}</span>
        <span className={s.number}>{number}</span>
      </div>
      <div className={s.buttonWrap}>
        <button onClick={handleClick} type="button" className={s.button}>
          <AiFillSetting />
        </button>
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
          number={number}
          changeData
          onSubmit={onContactChange}
        />
      </Popover>
    </>
  );
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
