import React, { useState } from 'react';

const SuffixInput = ({inputValue, setInputValue, suffix, disabled}) => {

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleBlur = () => {
    // Append the suffix when the input loses focus
    if (inputValue) {
      setInputValue(inputValue + suffix);
    }
  };

  const handleFocus = () => {
    if (inputValue.endsWith(suffix)) {
      setInputValue(inputValue.slice(0, -suffix.length));
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={disabled}
    />
  );
};

export default SuffixInput;