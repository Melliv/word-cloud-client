import { useEffect, useState } from 'react';
import WordCloudForm from './TextFileForm';
import WordCloudList from './TextFileList';
import { WordCloudService } from '../../services/word-cloud-service';
import { ITextFile } from '../../types/ITextFile';
// import { io } from 'socket.io-client';

// const socket = io('ws://localhost:8085');
export default function TextFileView() {
  // const [notifications, setNotifications] = useState<[]>([]);

  // useEffect(() => {
  //   // Listen for incoming notifications from the server
  //   socket.on('messages', (notification) => {
  //     console.log('testing: ', notification);

  //     // setNotifications([...notifications, notification]);
  //   });

  //   // Clean up event listeners on unmount
  //   return () => {
  //     socket.off('notification');
  //   };
  // }, []);

  const [textFiles, setTextFiles] = useState<ITextFile[]>([]);

  const getTextFilesList = async () => {
    const result = await WordCloudService.GetTextFiles();
    if (result.data) {
      setTextFiles(result.data.files);
    }
  };

  const updateFilesList = () => {
    getTextFilesList();
  };

  useEffect(() => {
    getTextFilesList();
  }, []);

  return (
    <div className="grid gap-12 mt-8">
      <WordCloudForm updateFilesList={updateFilesList} />
      <WordCloudList textFiles={textFiles} />
    </div>
  );
}
