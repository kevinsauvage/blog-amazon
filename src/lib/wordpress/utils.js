/* eslint-disable import/prefer-default-export */
const REVALIDATE = 60 * 60; // 1hour

export const handleFetch = async (url) => {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE } });
    const totalResult = response.headers.get('X-WP-Total');
    const data = await response.json();
    return { data, totalResult };
  } catch (error) {
    console.error({ error: error.stack, message: error.message, url });
  }
};
