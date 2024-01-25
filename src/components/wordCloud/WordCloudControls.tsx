import { useState } from 'react';
import Loader from '../common/Loader';

interface IProps {
  toggleCommonWords: () => void;
  changeMaxWordsCount: (count: number) => void;
  defaultMaxWordsCount: number;
  defaultShowConjuctions: boolean;
  downloadWordCloudPDF: () => Promise<void>;
  downloadWordCloudWordsCSV: () => void;
}

export default function WordCloudControls({
  toggleCommonWords,
  changeMaxWordsCount,
  defaultMaxWordsCount,
  defaultShowConjuctions,
  downloadWordCloudPDF,
  downloadWordCloudWordsCSV
}: IProps) {
  const [loadWordCloudPDF, setLoadWordCloudPDF] = useState(false);
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-xl max-w-md bg-gray-100 p-8 grid gap-4">
      <div className="relative mb-6">
        <label className="">Max words count</label>
        <input
          min={1}
          max={200}
          defaultValue={defaultMaxWordsCount}
          onChange={(event) => changeMaxWordsCount(parseInt(event.target.value))}
          id="labels-range-input"
          type="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-sm absolute start-0 -bottom-6">1</span>
        <span className="text-sm absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
          100
        </span>
        <span className="text-sm absolute end-0 -bottom-6">200</span>
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            defaultChecked={defaultShowConjuctions}
            onChange={toggleCommonWords}
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
          />
        </div>
        <label className="ms-2 text-sm font-medium">Show common words</label>
      </div>
      <div className="flex gap-4 items-center">
        <label className="ms-2 text-sm font-medium">Download Word cloud PDF</label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={async () => {
            setLoadWordCloudPDF(true);
            await downloadWordCloudPDF();
            setLoadWordCloudPDF(false);
          }}
          disabled={loadWordCloudPDF}>
          {loadWordCloudPDF ? (
            <>
              <Loader />
              Loading
            </>
          ) : (
            'Download'
          )}
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <label className="ms-2 text-sm font-medium">Download Word cloud words CSV</label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => {
            downloadWordCloudWordsCSV();
          }}>
          Download
        </button>
      </div>
    </div>
  );
}
