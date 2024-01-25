import { IWord } from '../../types/IWord';

interface IProps {
  wordsItems: IWord[];
}

export default function WordCloudWordsList({ wordsItems }: IProps) {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-xl max-w-xs">
      <table className="text-sm text-left rtl:text-right text-black dark:text-gray-800">
        <thead className="text-xs uppercase bg-gray-200 border-black border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3 grid-cols-8">
              Text
            </th>
            <th scope="col" className="px-6 py-3 grid-cols-4">
              Count
            </th>
          </tr>
        </thead>

        <tbody>
          {wordsItems.map((word, i) => {
            return (
              <tr className="odd:bg-gray-50 even:bg-gray-100" key={'word-cloud-list-row- ' + i}>
                <td className="px-6 py-4 font-medium">{word.text}</td>
                <td className="px-6 py-4">{word.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
