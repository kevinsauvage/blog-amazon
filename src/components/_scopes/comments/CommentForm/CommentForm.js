'use client';

import useForm from '@/hooks/useForm';

import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import TextArea from '../../../TextArea/TextArea';

import styles from './CommentForm.module.scss';

const CommentForm = ({ postId, threadOf, callback }) => {
  const handleSubmitCallback = async (formData) => {
    const { email, name, comment } = formData;

    if (!(email || name || comment || postId)) {
      window.alert('Please fill in all the fields');
      return false;
    }
    const response = await fetch('/api/comments', {
      body: JSON.stringify({
        comment,
        email,
        name,
        postId,
        threadOf,
      }),
      method: 'POST',
    });
    const responseJson = await response.json();
    const { error } = responseJson || {};

    if (response?.status === 200) {
      alert(
        'Great job! Your comment has been successfully submitted. Our team will carefully review it, and once approved, it will be proudly displayed right here for everyone to see. Thank you for your contribution!'
      );
      callback();
      return true;
    }

    if (error?.message) {
      alert(JSON.parse(error.message).message);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading } = useForm(handleSubmitCallback, {
    comment: '',
    email: '',
    name: '',
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h5 className={styles.title}>Leave a comment</h5>
      <div className={styles.row}>
        <Label>
          Your name
          <Input
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name..."
            name="name"
          />
        </Label>
        <Label>
          Your email
          <Input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email..."
            name="email"
          />
        </Label>
      </div>
      <Label>
        Your comment
        <TextArea
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="Enter  your comment..."
          name="comment"
        />
      </Label>
      <Button type="submit" text="Post comment" loading={loading} />
    </form>
  );
};

export default CommentForm;
