import * as React from 'react';

const IconTimeOutline = (properties) => (
  <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" {...properties}>
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M256 128v144h96"
    />
  </svg>
);

export default IconTimeOutline;
