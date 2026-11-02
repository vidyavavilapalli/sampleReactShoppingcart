import {useMemo } from 'react';

export default   function ExpensiveCalculation({ a, b }) {
  const result = useMemo(() => {
    console.log('Calculating...');
    return a * b;
  }, [a, b]);

  return <p>Result: {result}</p>;
}