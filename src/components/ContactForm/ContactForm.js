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
      <label>
        Name
        <input type="text" placeholder="Name" name="name" onChange={handleChange} title="Name" />
      </label>
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          title="Email"
        />
      </label>
      <label>
        Message
        <textarea placeholder="Message" name="message" onChange={handleChange} title="message" />
      </label>
      <Button type="submit" text="Submit" />
    </form>
  );
};

export default ContactForm;
