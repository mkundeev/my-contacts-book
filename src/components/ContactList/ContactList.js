import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

import s from './ContactList.module.css';

export default function ContactList({ contacts }) {
  return (
    <ul className={s.list}>
      {contacts &&
        [...contacts]
          .sort(({ name: nameA }, { name: nameB }) =>
            nameA.toLowerCase().localeCompare(nameB.toLowerCase())
          )
          .map(({ name, number, id }) => (
            <li key={id} className={s.item}>
              <ContactItem name={name} number={number} id={id} />
            </li>
          ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
