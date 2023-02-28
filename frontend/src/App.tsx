import React, { useState, useEffect } from 'react';
import { Drink, NewDrink } from './types/Drink';
import DrinksService from './services/drinks';
import DrinksTable from './components/DrinksTable';
import CreateDrinkForm from './components/CreateDrinkForm';
import Message from './components/Message';

const App = () => {

  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined);
  const [message, setMessage] = useState<string>();

  const fetchDrinksFromApi = async () => {
    try {
      const drinksFromApi = await DrinksService.getDrinks();
      setDrinks(drinksFromApi);
    } catch (error) {
      setMessage('Failed to fetch drinks from API');
    }
  };

  const createDrink = async (drinkToCreate: NewDrink) => {
    try {
      const newDrinkFromApi = await DrinksService.createDrink(drinkToCreate);
      setDrinks([...drinks ? drinks : [], newDrinkFromApi]);
    } catch (error) {
      setMessage('Failed to create new drink');
    }
  };

  useEffect(() => {
    fetchDrinksFromApi();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-3xl font-bold">Drinks</h1>
        <Message text={message} />
        <CreateDrinkForm createDrink={createDrink} />
        <DrinksTable drinks={drinks} />
      </div>
    </div>
  );

};

export default App;
