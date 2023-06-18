'use client';

import useForm from '@/hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';
import TextArea from '../TextArea/TextArea';

import styles from './ContactForm.module.scss';

const handleSubmitCallback = (formData) => {
  console.log(formData);
};

const ContactForm = () => {
  const { formData, handleInputChange, handleSubmit, loading } = useForm(handleSubmitCallback, {
    email: '',
    message: '',
    name: '',
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          title="Name"
          placeholder="Enter you name..."
          value={formData.name}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        Email
        <Input
          type="email"
          name="email"
          title="Email"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        Message
        <TextArea
          name="message"
          title="message"
          placeholder="Enter your message..."
          value={formData.message}
          onChange={handleInputChange}
        />
      </Label>
      <Button type="submit" text="Send message" loading={loading} />
    </form>
  );
};

export default ContactForm;
