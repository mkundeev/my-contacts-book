import { useState } from 'react';
import Popover from '@mui/material/Popover';
import VerificationForm from 'components/VerificationForm';
import s from './VerificationEmail.module.css';

export default function VerificationEmail() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <p onClick={handleClick} className={s.link}>
        Resend vefification letter
      </p>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <VerificationForm onClose={handleClose} />
      </Popover>
    </div>
  );
}
