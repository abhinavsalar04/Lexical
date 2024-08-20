import './textInputStyle.css';
import React from 'react';

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
}) {
  return (
    <div className="TextInput__wrapper">
      <label className="TextInput__label">{label}</label>
      <input
        type={type}
        className="TextInput__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        data-test-id={dataTestId}
      />
    </div>
  );
}
