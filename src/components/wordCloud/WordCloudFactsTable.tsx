import { Formatter } from '../../helpers/Formatter';
import { ITextFile } from '../../types/ITextFile';

interface IProps {
  textFile: ITextFile;
}

export default function WordCloudFactsTable({ textFile }: IProps) {
  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto">
      <table className="w-full text-sm leading-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left font-bold">File details</th>
            <th className="py-3 px-4 text-left font-bold" />
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-left font-medium">File name</td>
            <td className="py-3 px-4 text-left">{textFile.name}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-3 px-4 text-left font-medium">Size</td>
            <td className="py-3 px-4 text-left">{Formatter.formatBytes(textFile.size)}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-left font-medium">Status</td>
            <td
              className={
                'py-3 px-4 text-left capitalize word-cloud-status-' +
                textFile.status.toLocaleLowerCase()
              }>
              {textFile.status.toLocaleLowerCase()}
            </td>
          </tr>
          {textFile.words && (
            <tr className="bg-gray-100">
              <td className="py-3 px-4 text-left font-medium">Words count</td>
              <td className="py-3 px-4 text-left">
                {Formatter.numberWithSpaces(textFile.words.count)}
              </td>
            </tr>
          )}
          {textFile.words && (
            <tr className="bg-gray-50">
              <td className="py-3 px-4 text-left font-medium">Not repeated words count</td>
              <td className="py-3 px-4 text-left">
                {Formatter.numberWithSpaces(textFile.words.items.length)}
              </td>
            </tr>
          )}
          {textFile.words && (
            <tr className="bg-gray-100">
              <td className="py-3 px-4 text-left font-medium">Processing time</td>
              <td className="py-3 px-4 text-left">{textFile.words.processingTime}(s)</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
