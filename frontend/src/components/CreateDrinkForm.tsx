import React, { useState } from 'react';
import { DrinkType, NewDrink, Roast } from '../types/Drink';
import { parseNewDrink } from '../utils/validation';
import DrinkTypeSelect from './InputElements/DrinkTypeSelect';
import NumberField from './InputElements/NumberField';
import RoastSelect from './InputElements/RoastSelect';
import TextField from './InputElements/TextField';

type CreateDrinkFormProps = {
  createDrink: (drinkToCreate: NewDrink) => void;
}

const CreateDrinkForm = ({ createDrink }: CreateDrinkFormProps) => {

  const [name, setName] = useState<string>();
  const [drinkType, setDrinkType] = useState<DrinkType>();
  const [roast, setRoast] = useState<Roast>();
  const [weight, setWeight] = useState<number>();
  const [price, setPrice] = useState<number>();
  
  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const drinkToCreate = {
      name,
      roast,
      weight,
      price,
      type: drinkType
    };

    try {
      const sanitizedNewDrink = parseNewDrink(drinkToCreate);
      createDrink(sanitizedNewDrink);
    } catch (error) {
      console.log(error);
    }
    
  };
  
  return (
    <form className="flex flex-col gap-2 w-full">
      <h2 className="text-xl">Add a drink</h2>
      <div className="flex flex-row gap-2 w-full">
        <TextField placeholder='Name' onTextChange={(text) => { setName(text); }} />
        <DrinkTypeSelect onDrinkTypeChange={(value) => { setDrinkType(value); }} />
        <RoastSelect onRoastChange={(value) => { setRoast(value); }} />
      </div>
      <div className="flex flex-row gap-2 w-full">
        <NumberField placeholder='Weight g.' onNumberChange={(number) => { setWeight(number); }} />
        <NumberField placeholder='Price' onNumberChange={(number) => { setPrice(number); }} />
        <button className="btn btn-primary" onClick={onSubmit}>Add</button>
      </div>
    </form>
  );
};

export default CreateDrinkForm;