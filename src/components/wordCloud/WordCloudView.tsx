import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITextFile } from '../../types/ITextFile';
import { WordCloudService } from '../../services/word-cloud-service';
import WordCloudFactsTable from './WordCloudFactsTable';
import WordCloudTable from './WordCloudTable';
import WordCloudWordsList from './WordCloudWordsList';
import WordCloudControls from './WordCloudControls';
import { IWord } from '../../types/IWord';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { download, generateCsv, mkConfig } from 'export-to-csv';

const CONJUCTIONS = [
  'or',
  'so',
  'as',
  'that',
  'although',
  'if',
  'neither',
  'since',
  'when',
  'and',
  'before',
  'once',
  'than',
  'until',
  'but',
  'for',
  'because',
  'nor',
  'unless',
  'yet'
];
const OTHER = [
  'i',
  'you',
  'a',
  'the',
  'my',
  'it',
  'that',
  'to',
  'in',
  'on',
  'of',
  'this',
  'with',
  'by',
  'as'
];

export default function WordCloudView() {
  const { id } = useParams();
  const [textFile, setTextFile] = useState<ITextFile | undefined>();
  const [wordsItems, setWordsItems] = useState<IWord[]>([]);
  const [maxWordsCount, setMaxWordsCount] = useState(100);
  const [showCommonWords, setShowConjunctions] = useState(true);
  const COMMON_WORDS = CONJUCTIONS.concat(OTHER);

  const initData = async () => {
    if (id) {
      const response = await WordCloudService.GetTextFile(parseInt(id));
      if (response.ok) {
        setTextFile(response.data);
        if (response.data?.words?.items) {
          setWordsItems(response.data.words.items);
        }
      }
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const toggleCommonWords = () => {
    const _showCommonWords = !showCommonWords;
    setShowConjunctions(_showCommonWords);
    let _wordsItems = textFile?.words?.items;
    if (!_wordsItems) return;

    if (_showCommonWords) {
      setWordsItems(_wordsItems);
    } else {
      _wordsItems = _wordsItems.filter((w) => !COMMON_WORDS.includes(w.text));
      setWordsItems(_wordsItems);
    }
  };

  const changeMaxWordsCount = (value: number) => {
    value = Math.max(1, Math.min(200, value));
    setMaxWordsCount(value);
  };

  const downloadWordCloudPdf = async () => {
    const input = document.getElementById('word-cloud');
    if (!input || !textFile) return;
    await html2canvas(input).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage({
        imageData: imgData,
        x: 0,
        y: 0,
        width: 250,
        height: 250,
        format: 'JPEG',
        compression: 'FAST'
      });
      pdf.save(`${textFile.name.replace('.txt', '')}-word_cloud.pdf`);
    });
  };

  const downloadWordCloudWordsCSV = () => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const data = wordsItems.map((w) => {
      return { text: w.text, count: w.value };
    });
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  if (!textFile) return <></>;
  return (
    <div className="grid justify-items-center gap-4 mb-8">
      <WordCloudFactsTable textFile={textFile} />
      {textFile.words && (
        <div className="grid justify-items-center gap-4 w-full">
          <WordCloudControls
            toggleCommonWords={toggleCommonWords}
            changeMaxWordsCount={changeMaxWordsCount}
            defaultMaxWordsCount={maxWordsCount}
            defaultShowConjuctions={showCommonWords}
            downloadWordCloudPDF={downloadWordCloudPdf}
            downloadWordCloudWordsCSV={downloadWordCloudWordsCSV}
          />
          <WordCloudTable wordsItems={wordsItems} maxWordsCount={maxWordsCount} />
          <WordCloudWordsList wordsItems={wordsItems} />
        </div>
      )}
    </div>
  );
}
