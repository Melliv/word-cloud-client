import { Formatter } from '../../helpers/Formatter';

interface IProps {
  file: File;
}

export default function TextFileFactsTable({ file }: IProps) {
  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto">
      <table className="w-full text-sm leading-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-bold">File details</th>
            <th className="py-3 px-4 text-left font-bold" />
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="py-3 px-4 text-left font-medium">File name</td>
            <td className="py-3 px-4 text-left">{file.name}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-3 px-4 text-left font-medium">Type</td>
            <td className="py-3 px-4 text-left">{file.type}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-4 text-left font-medium">Size</td>
            <td className="py-3 px-4 text-left">{Formatter.formatBytes(file.size)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
