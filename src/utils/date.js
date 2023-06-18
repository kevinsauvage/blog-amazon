// eslint-disable-next-line import/prefer-default-export
export const formatTimestamp = (timestamp, includeTime = false) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(timestamp);
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const day = date.getDate();
  const year = date.getFullYear();

  let formattedDate = `${month} ${day}, ${year}`;

  if (includeTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    formattedDate += ` - ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  return formattedDate;
};
