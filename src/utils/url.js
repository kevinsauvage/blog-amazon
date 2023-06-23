/* eslint-disable import/prefer-default-export */

export const decodeURL = (url) => {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.error('Error decoding URL:', error);
  }
};
