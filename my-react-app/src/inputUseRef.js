import React, { useRef } from 'react';

export default function InputWithFocus() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}