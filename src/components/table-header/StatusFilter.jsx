import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortingOptions,
  setSortingOptions,
} from "../../slices/TableSlice";

export default function StatusFilter() {
  const dispatch = useDispatch();
  const statusFilter = useSelector((state) =>
    selectSortingOptions(state)
  ).statusFilter;
  console.log(statusFilter);
  function handleChange(e) {
    dispatch(
      setSortingOptions({
        type: "statusFilter",
        data: e.target.value.toLowerCase(),
      })
    );
  }

  return (
    <select
      value={statusFilter}
      onChange={handleChange}
      className="border rounded-lg bg-white px-4 py-2"
    >
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="blocked">Blocked</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}
