// eslint-disable-next-line import/prefer-default-export
export const formatString = (inputString) => {
  const words = inputString.split('-');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};
