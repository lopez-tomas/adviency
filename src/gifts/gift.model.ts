export interface Gift {
  readonly id: number;
  gift: string;
  price: number;
  to: string;
  image?: string;
  quantity: number;
}