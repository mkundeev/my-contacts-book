import { Formik, Field, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import s from './ContactForm.module.css';

export default function ContactForm({
  name = 'Name',
  phone = 'Number',
  email = 'Email',
  changeData,
  onSubmit,
}) {
  return (
    <Formik
      initialValues={{ name: '', phone: '', email: '' }}
      validationSchema={Yup.object(
        changeData
          ? {
              name: Yup.string().matches(
                /(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/,
                "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              ),
              phone: Yup.string().matches(
                /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/,
                'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
              ),
              email: Yup.string().email('Please provide valid e-mail'),
            }
          : {
              name: Yup.string()
                .matches(
                  /(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/,
                  "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                )
                .required('Required'),
              phone: Yup.string()
                .matches(
                  /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/,
                  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
                )
                .required('Required'),
              email: Yup.string().email('Please provide valid e-mail'),
            }
      )}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm({});
      }}
    >
      <Form className={s.form}>
        <label htmlFor="name" className={s.label}>
          {name}
        </label>
        <Field name="name" type="text" className={s.input} />
        <ErrorMessage
          name="name"
          render={msg => <div className={s.error}>{msg}</div>}
        />

        <label htmlFor="phone" className={s.label}>
          {phone}
        </label>
        <Field name="phone" type="tel" className={s.input} />
        <ErrorMessage
          name="phone"
          render={msg => <div className={s.error}>{msg}</div>}
        />
        <label htmlFor="email" className={s.label}>
          {email}
        </label>
        <Field name="email" type="email" className={s.input} />
        <ErrorMessage
          name="email"
          render={msg => <div className={s.error}>{msg}</div>}
        />

        <button type="submit" className={s.button}>
          {changeData ? 'Change details' : 'Add contact'}
        </button>
      </Form>
    </Formik>
  );
}
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  changeData: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};
