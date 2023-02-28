import React, { useState, useEffect } from 'react';
import { Drink } from './types/Drink';
import DrinksService from './services/drinks';
import DrinksTable from './components/DrinksTable';

const App = () => {

  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined);

  const fetchDrinksFromApi = async () => {
    try {
      const drinksFromApi = await DrinksService.getDrinks();
      setDrinks(drinksFromApi);
    } catch (error) {
      console.log('Failed to fetch drinks from API');
    }
  };

  useEffect(() => {
    fetchDrinksFromApi();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-3xl font-bold">Drinks</h1>
        <DrinksTable drinks={drinks} />
      </div>
    </div>
  );

};

export default App;
