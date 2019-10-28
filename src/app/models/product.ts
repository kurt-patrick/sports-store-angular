export class Product {

  constructor() { }

  id: number;
  imageUrl: string;
  productName: string;
  productPrice: number;
  gender: Gender;
  colourDescription: string;
}

export enum Gender {
  mens = 0,
  womens = 1
}
