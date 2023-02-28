import React, { useState } from 'react';

type TextFieldProps = {
  placeholder: string;
  onTextChange: (text: string) => void;
}

const TextField = (props: TextFieldProps) => {

  const [text, setText] = useState<string>('');

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const textToSet = event.currentTarget.value;
    setText(textToSet);
    props.onTextChange(textToSet);
  };

  return (
    <input type="text" placeholder={props.placeholder} value={text} onChange={onInputChange} className="input input-bordered w-full max-w-xs" />
  );
};

export default TextField;