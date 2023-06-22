/* eslint-disable import/prefer-default-export */
export const createQueryString = (parameters_, searchParameters) => {
  const parameters = new URLSearchParams(searchParameters);

  Object.entries(parameters_).forEach(([name, value]) => {
    parameters.set(name, value);
  });

  return parameters.toString();
};

export const decodeURL = (url) => {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.error('Error decoding URL:', error);
  }
};
