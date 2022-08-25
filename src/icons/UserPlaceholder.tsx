import React from 'react';

export default function UserPlaceholder() {
  return (
    <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24.5" r="24" fill="white"/>
      <circle cx="24" cy="24.5" r="24" fill="white"/>
      <mask id="mask0_1493_746" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="49">
      	<circle cx="24" cy="24.5" r="24" fill="white"/>
      </mask>
      <g mask="url(#mask0_1493_746)">
      	<path opacity="0.6" fillRule="evenodd" clipRule="evenodd" d="M24 32.5C28.6963 32.5 32.5 28.6962 32.5 24C32.5 19.3038 28.6963 15.5 24 15.5C19.3038 15.5 15.5 19.3038 15.5 24C15.5 28.6962 19.3038 32.5 24 32.5ZM24 36.75C18.3263 36.75 7 39.5975 7 45.25V49.5H41V45.25C41 39.5975 29.6737 36.75 24 36.75Z" fill="#CBCFD5"/>
      </g>
    </svg>
  );
}
