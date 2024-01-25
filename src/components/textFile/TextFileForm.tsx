import { useState } from 'react';
import { WordCloudService } from '../../services/word-cloud-service';
import TextFileFactsTable from './TextFileFactsTable';

interface IProps {
  updateFilesList: () => void;
}

export default function TextFileForm({ updateFilesList }: IProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      await WordCloudService.UploadTextFileFileForAnalytics(formData);
      updateFilesList();
      setFile(null);
      setTimeout(() => {
        updateFilesList();
      }, 5000);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <input id="file" type="file" accept=".txt" onChange={handleFileChange} />
        <button
          className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => document.getElementById('file')?.click()}>
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
          </svg>

          <span>Select file</span>
        </button>
      </div>
      {file && <TextFileFactsTable file={file} />}

      {file && (
        <div>
          <button
            className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handleUpload}>
            Upload a file
          </button>
        </div>
      )}
    </div>
  );
}
