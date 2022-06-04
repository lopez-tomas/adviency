export interface Gift {
  id: number;
  gift: string;
  price: number;
  to: string;
  image?: string
  quantity: number;
}

export interface InitialState {
  gifts: Gift[];
  lastId: number;
}