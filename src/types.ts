import { Gift } from './gifts/gift.model';
import { AddGiftDto, EditGiftDto } from './gifts/gift.dto';

export interface InitialState {
  gifts: Gift[];
  lastId: number;
}

export interface ContextProps {
  state?: InitialState;
  addGift?: (payload: AddGiftDto) => string;
  editGift?: (id: Gift['id'], payload: EditGiftDto) => string;
  deleteGift?: (id: Gift['id']) => string;
  deleteAll?: () => void;
}

export interface FormProps {
  onClose: () => void;
  idGift?: Gift['id'];
  duplicate?: boolean;
}