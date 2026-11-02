import React, { useState, useLayoutEffect, useRef } from 'react';

function HookEx() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (boxRef.current) {
        setWidth(boxRef.current.offsetWidth);
        setHeight(boxRef.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={boxRef} style={{ width: '60%', height: '50%', backgroundColor: 'red' }}>
      <p>width:{width}</p>
      <p>height:{height}</p>
    </div>
  );
}

export default HookEx;