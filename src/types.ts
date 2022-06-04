import { Gift, InitialState } from './gifts/gift.model';
import { AddGiftDto, EditGiftDto } from './gifts/gift.dto';

export interface ContextProps {
  state?: InitialState;
  addGift?: (gift: AddGiftDto) => string;
  editGift?: (id: Gift['id'], gift: EditGiftDto) => (string | Gift);
  removeGift?: (id: Gift['id']) => (string | Gift);
  removeAll?: () => void;
}

export interface FormProps {
  onClose: () => void;
  idGift?: number | string;
}