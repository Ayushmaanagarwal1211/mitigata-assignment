import React from "react";
import { selectFilteredData } from "../slices/TableSlice";
import { useSelector } from "react-redux";

export default function TableFooter({
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) {
  const filteredData = useSelector((state) => selectFilteredData(state));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4  flex items-center  justify-center mt-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 px-3 border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          {"<"}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg text-black">
            <span className="font-semibold"> Page</span>{" "}
            <select
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(+e.target.value);
              }}
              className=" rounded-lg border-[1px] border-gray-400 px-4 py-2  bg-white"
            >
              {Array.from(
                { length: Math.ceil(filteredData.length / 10) },
                (_, index) => index + 1
              ).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{" "}
            of {totalPages}
          </span>
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 px-3 border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2  border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
