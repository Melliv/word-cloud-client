import { ITextFile } from '../../types/ITextFile';
import TextFileListBody from './TextFileListBody';
import TextFileListHeader from './TextFileListHeader';

interface IProps {
  textFiles: ITextFile[];
}

export default function TextFileList({ textFiles }: IProps) {
  if (textFiles.length === 0) return <></>;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-xl max-w-lg justify-self-center">
      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-800">
        <TextFileListHeader />

        <TextFileListBody textFiles={textFiles} />
      </table>
    </div>
  );
}
