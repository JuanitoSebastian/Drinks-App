import React, { useState } from 'react';
import { Roast } from '../../types/Drink';
import { parseRoast } from '../../utils/validation';

type RoastSelectProps = {
  onRoastChange: (drinkType: Roast | undefined) => void;
}

const RoastSelect = (props: RoastSelectProps) => {

  const [roast, setRoast] = useState<Roast>();

  const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roastNumber = Number(event.target.value);
    const roastToSet = parseRoast(roastNumber);
    setRoast(roastToSet);
    props.onRoastChange(roastToSet);
  };

  return (
    <select className="select select-bordered w-full max-w-xs" onChange={onInputChange} defaultValue="default" value={roast}>
      <option disabled value="default">Roast level (1-5)</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  );
};

export default RoastSelect;