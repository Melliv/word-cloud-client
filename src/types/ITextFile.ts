import { IWords } from './IWords';

export interface ITextFile {
  id: number;
  name: string;
  size: number;
  status: string;
  words: IWords | null;
}
