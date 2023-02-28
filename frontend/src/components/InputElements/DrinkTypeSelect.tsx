import React, { useState } from 'react';
import { DrinkType } from '../../types/Drink';
import { parseDrinkType } from '../../utils/validation';

type DrinkTypeSelectProps = {
  onDrinkTypeChange: (drinkType: DrinkType|undefined) => void;
}

const DrinkTypeSelect = (props: DrinkTypeSelectProps) => {

  const [drinkType, setDrinkType] = useState<DrinkType>();

  const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const drinkTypeToSet = parseDrinkType(event.target.value);
    setDrinkType(drinkTypeToSet);
    props.onDrinkTypeChange(drinkTypeToSet);
  };

  return (
    <select className="select select-bordered w-full max-w-xs" onChange={onInputChange} defaultValue="default" value={drinkType}>
      <option value="default" disabled>Drink Type</option>
      <option value='coffee'>Coffee</option>
      <option value='tea'>Tea</option>
    </select>
  );
};

export default DrinkTypeSelect;