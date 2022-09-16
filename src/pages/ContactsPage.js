import { useState, useMemo } from 'react';
import { useGetContactsQuery, useAddContactMutation } from 'redux/contactsAPI';
import { toast } from 'react-toastify';
import Container from 'components/Container';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Notification from 'components/Notification';
import s from './page.module.css';

export default function ContactsPage() {
  const [filter, setFilter] = useState('');
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const formSubmit = contact => {
    if (data.some(({ name }) => name === contact.name)) {
      toast.error(`${contact.name} is already in contacts`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    addContact(contact);
  };

  const filteredContacts = useMemo(() => {
    if (!data) {
      return;
    }
    const normilizedFilter = filter.toLowerCase();
    return data.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  }, [data, filter]);

  return (
    <div className={s.contactsPageWrap}>
      <Container>
        <h2>Phonebook menu</h2>
        <ContactForm onSubmit={formSubmit} />
        <Filter changeFilter={setFilter} />
      </Container>
      <Container style={{ position: 'relative' }}>
        <h2>Contacts</h2>
        {filteredContacts?.length > 0 && (
          <ContactList contacts={filteredContacts} />
        )}
        {filteredContacts?.length === 0 && (
          <Notification message={'No contacts found'} />
        )}
      </Container>
    </div>
  );
}
