'use client';

import { useState } from 'react';

import Button from '../Button/Button';

import styles from './ContactForm.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({ email: '', message: '', name: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="name" onChange={handleChange} />
      <input type="email" placeholder="Email" name="email" onChange={handleChange} />
      <textarea placeholder="Message" name="message" onChange={handleChange} />
      <Button type="submit" text="Submit" />
    </form>
  );
};

export default ContactForm;
