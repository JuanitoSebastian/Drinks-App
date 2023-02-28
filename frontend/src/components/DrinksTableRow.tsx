import React from 'react';
import { Drink } from '../types/Drink';

interface DrinksTableRowProps {
  drink: Drink;
}

const DrinksTableRow = (props: DrinksTableRowProps) => {

  return (
    <tr>
      <th>{props.drink.name}</th>
      <td>{props.drink.type}</td>
      <td>{props.drink.roast}</td>
      <td>{props.drink.weight} g</td>
      <td>{props.drink.price} €</td>
    </tr>
  );
};

export default DrinksTableRow;