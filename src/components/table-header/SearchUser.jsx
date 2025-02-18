import React from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortingOptions,
  setSortingOptions,
} from "../../slices/TableSlice";

export default function SearchUser() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) =>
    selectSortingOptions(state)
  ).searchTerm;

  function handleChange(e) {
    dispatch(setSortingOptions({ type: "searchTerm", data: e.target.value }));
  }

  return (
    <div className="relative max-md:w-[95vw]">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 pr-4 max-md:w-[100%] max-md:mb-3 py-2 border-[1px] border-gray-400 bg-white rounded-lg w-64"
        placeholder="Search users..."
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  );
}
