export interface Gift {
  id: number | string;
  gift: string;
  price: number | string;
  to: string;
  image?: string
  quantity: number | string;
}

export interface InitialState {
  gifts: Gift[];
  lastId: number;
}