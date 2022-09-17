import React from 'react';
import { useResendVerificationMutation } from 'redux/contactsAPI';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import s from './VerificationForm.module.css';

export default function VerificationForm({ onClose }) {
  const [resendVerification] = useResendVerificationMutation();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Please provide valid e-mail')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        resendVerification(values)
          .unwrap()
          .then(data => {
            toast.success(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            onClose();
          })
          .catch(err => {
            toast.error(err.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        setSubmitting(false);
        resetForm({});
      }}
    >
      <Form className={s.form}>
        <label htmlFor="email" className={s.label}>
          E-mail
        </label>
        <Field name="email" type="email" className={s.input} />
        <ErrorMessage
          name="email"
          render={msg => <div className={s.error}>{msg}</div>}
        />
        <button type="submit" className={s.button}>
          Resend verification email
        </button>
      </Form>
    </Formik>
  );
}
