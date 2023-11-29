"use client"
import React from 'react';
import Form from './form';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();

  const backButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <button onClick={() => router.push("/")} style={backButtonStyle}>
        Back
      </button>
      <Form />
    </div>
  );
}
