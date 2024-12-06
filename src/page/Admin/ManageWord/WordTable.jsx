import { Trash, FilePen } from "lucide-react";
import { Link } from "react-router";

export default function WordTable({ paginatedData, handleDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-[#C9C7F8]">
            <th className="border border-indigo-300 p-3 text-center kobita">
              #
            </th>
            <th className="border border-indigo-300 py-3 text-center kobita">
              Category
            </th>
            <th className="border border-indigo-300 px-4 py-3 text-center kobita">
              Word
            </th>
            <th className="border border-indigo-300 px-4 py-3 text-center whitespace-pre-line kobita">
              Meaning
            </th>
            <th className="border border-indigo-300 px-4 py-3 text-center kobita">
              Edit
            </th>
            <th className="border border-indigo-300 p-3 text-center kobita">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={item.id} className="hover:bg-[#cbcef86e]">
              <td className="border border-indigo-300 text-center kobita">
                {index + 1}
              </td>
              <td className="border border-indigo-300 text-center font-bold
               py-3 kobita">
                {item.category}
              </td>
              <td className="border border-indigo-300 text-center py-3 uppercase kobita">
                {item.word}
              </td>
              <td className="border border-indigo-300 text-center py-3 kobita ">
                {item.meaning
                  .slice(0, 20)
                  .replace(/\b\w/g, (i) => i.toUpperCase())}
              </td>
              <td className="border border-indigo-300 text-center py-3 kobita">
                <Link to={`/update/${item.category}/${item.id}`}>
                  <button className="cursor-pointer transition-all bg-yellow-500 text-white px-6 py-2 rounded-lg border-yellow-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    <FilePen />
                  </button>
                </Link>
              </td>
              <td className="border border-indigo-300 text-center py-3 kobita">
                <button
                  className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  onClick={() => handleDelete(item.category, item.id)}
                  aria-label="Delete"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
