import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useChangeSubscriptionMutation } from 'redux/contactsAPI';
import s from './SubscriptionRadioButton.module.css';

export default function SubscriptionRadioButton({ onClose }) {
  const [changeSubscription] = useChangeSubscriptionMutation();
  const [subscription, setSubscription] = useState('');

  const handleChange = e => {
    setSubscription(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    changeSubscription({ subscription });
    onClose();
  };

  return (
    <div className={s.container}>
      <FormControl>
        <FormLabel id="subscription-row-radio-buttons-group-label">
          Subscription
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="subscription-row-radio-buttons-group-label"
          name="subscription-radio-buttons-group"
        >
          <FormControlLabel
            value="starter"
            control={<Radio />}
            label="starter"
            onChange={handleChange}
          />
          <FormControlLabel
            value="pro"
            control={<Radio />}
            label="pro"
            onChange={handleChange}
          />
          <FormControlLabel
            value="business"
            control={<Radio />}
            label="business"
            onChange={handleChange}
          />
        </RadioGroup>
        <button type="submit" onClick={handleSubmit} className={s.button}>
          Change subscription
        </button>
      </FormControl>
    </div>
  );
}
