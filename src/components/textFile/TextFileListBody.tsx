import { Formatter } from '../../helpers/Formatter';
import { ITextFile } from '../../types/ITextFile';
import { useNavigate } from 'react-router-dom';

interface IProps {
  textFiles: ITextFile[];
}

export default function TextFileListBody({ textFiles }: IProps) {
  const navigate = useNavigate();

  return (
    <tbody>
      {textFiles.map((textFile, i) => {
        return (
          <tr
            className="odd:bg-white odd:dark:bg-gray-100 even:bg-gray-50 border-b cursor-pointer"
            key={'text-file-list-row- ' + i}
            onClick={() => {
              navigate(`/word-cloud/${textFile.id}`);
            }}>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap max-w-48 truncate">
              {textFile.name}
            </th>
            <td className="px-6 py-4">{Formatter.formatBytes(textFile.size)}</td>
            <td
              className={
                'px-6 py-4 capitalize word-cloud-status-' + textFile.status.toLocaleLowerCase()
              }>
              {textFile.status.toLocaleLowerCase()}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
