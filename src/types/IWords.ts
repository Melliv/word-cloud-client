import { IWord } from './IWord';

export interface IWords {
  id: number;
  count: number;
  processingTime: number;
  items: IWord[];
}
