import styles from './Input.module.scss';

const Input = ({ type, value, onChange, placeholder, ...rest }) => {
  const handleInputChange = (event) => onChange(event.target);

  return (
    <input
      type={type}
      className={styles.input}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
