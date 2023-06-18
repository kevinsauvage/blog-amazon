import { useCallback, useState } from 'react';

const useForm = (onSubmit, initialValues = {}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    Object.keys(initialValues).forEach((key) => {
      initialFormData[key] = initialValues[key] || '';
    });
    return initialFormData;
  });

  const handleInputChange = useCallback((target) => {
    const { type, name, value, checked } = target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const response = await onSubmit?.(formData);
      setLoading(false);
      if (response) setFormData(initialValues || {});
    },
    [formData, initialValues, onSubmit]
  );

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    setFormData,
  };
};

export default useForm;
