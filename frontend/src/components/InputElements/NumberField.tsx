import React, { useState } from 'react';

type NumberFieldProps = {
  placeholder: string;
  onNumberChange: (text: number) => void;
}

const NumberField = (props: NumberFieldProps) => {

  const [number, setNumber] = useState<string>('');

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNumber(event.currentTarget.value);
    const number = Number(event.currentTarget.value);
    props.onNumberChange(number);
  };

  return (
    <input type="number" placeholder={props.placeholder} value={number} onChange={onInputChange} className="input input-bordered w-full max-w-xs" />
  );
};

export default NumberField;