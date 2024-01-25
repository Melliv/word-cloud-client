export default function TextFileListHeader() {
  return (
    <thead className="text-xs uppercase bg-gray-50 border-black border-b-2">
      <tr>
        <th scope="col" className="px-6 py-3">
          File name
        </th>
        <th scope="col" className="px-6 py-3">
          Size
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
      </tr>
    </thead>
  );
}
