import React from 'react';
import { Drink } from '../types/Drink';
import DrinksTableRow from './DrinksTableRow';

interface DrinksTableProps {
  drinks: Drink[] | undefined;
}

const DrinksTable = (props: DrinksTableProps) => {

  if (!props.drinks) {
    return (<></>);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Roast</th>
            <th>Weight</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.drinks.map((drink) => (
            <DrinksTableRow key={drink.id} drink={drink} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinksTable;