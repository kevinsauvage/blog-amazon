/* eslint-disable import/prefer-default-export */
export const createQueryString = (name, value, searchParameters) => {
  const parameters = new URLSearchParams(searchParameters);

  parameters.set(name, value);

  return parameters.toString();
};

export const decodeURL = (url) => {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.error('Error decoding URL:', error);
  }
};
