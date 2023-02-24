
export interface Drink {
  id: number;
  type: DrinkType;
  name: string;
  price: number;
  roast: Roast;
}

export type DrinkType = 'coffee'|'tea';
export type Roast = 1|2|3|4|5;

export type NewDrink = Omit<Drink, 'id'>;