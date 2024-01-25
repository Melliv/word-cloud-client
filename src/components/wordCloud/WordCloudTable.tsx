import { useCallback } from 'react';
import { IWord } from '../../types/IWord';
import WordCloud from 'react-d3-cloud';

interface IProps {
  wordsItems: IWord[];
  maxWordsCount: number;
}

export default function WordCloudTable({ wordsItems, maxWordsCount }: IProps) {
  const cuttedWordsItems = wordsItems.slice(0, maxWordsCount);
  const fontSizeMultiplier = cuttedWordsItems.length < maxWordsCount ? 50 : 4;
  const fontSize = useCallback((word: IWord) => Math.log2(word.value) * fontSizeMultiplier, []);

  return (
    <div className="w-4/5" id="word-cloud">
      <WordCloud data={cuttedWordsItems} fontSize={fontSize} />
    </div>
  );
}
