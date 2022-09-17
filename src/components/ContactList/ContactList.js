import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosArrowDown } from 'react-icons/io';

import s from './ContactList.module.css';

export default function ContactList({ contacts }) {
  return (
    <ul className={s.list}>
      {contacts &&
        [...contacts]
          .sort(({ name: nameA }, { name: nameB }) =>
            nameA.toLowerCase().localeCompare(nameB.toLowerCase())
          )
          .map(({ name, phone, _id, email, favorite }) => (
            <li key={_id} className={s.item}>
              <Accordion className={s.accordion}>
                <AccordionSummary
                  aria-controls={name}
                  id={_id}
                  expandIcon={<IoIosArrowDown />}
                  className={s.itemListTitle}
                >
                  {name}
                </AccordionSummary>
                <AccordionDetails>
                  <ContactItem
                    name={name}
                    phone={phone}
                    id={_id}
                    email={email}
                    favorite={favorite}
                  />
                </AccordionDetails>
              </Accordion>
            </li>
          ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
