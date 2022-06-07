import { Gift } from './gift.model';

export type AddGiftDto = Omit<Gift, 'id'>;

export type EditGiftDto = Partial<AddGiftDto>;