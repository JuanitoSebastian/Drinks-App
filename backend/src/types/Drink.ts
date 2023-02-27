
export interface Drink {
  id: string;
  type: DrinkType;
  name: string;
  price: number;
  weight: number;
  roast: Roast;
}


export interface DrinkFromCsv {
  id: string;
  type: string;
  name: string;
  price: string;
  weight: string;
  roast: string;
}

export type DrinkType = 'coffee'|'tea';
export type Roast = 1|2|3|4|5;

export type NewDrink = Omit<Drink, 'id'>;