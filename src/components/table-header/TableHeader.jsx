import React from "react";
import SearchUser from "./SearchUser";
import StatusFilter from "./StatusFilter";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectSortingOptions,
  setSortingOptions,
} from "../../slices/TableSlice";

export default React.memo(function TableHeader() {
  const dateRange = useSelector((state) =>
    selectSortingOptions(state)
  ).dateRange;
  const dispatch = useDispatch();

  function handleDateChange(update) {
    const values = update.map((date) => (date ? date.toISOString() : null));
    dispatch(setSortingOptions({ data: values, type: "dateRange" }));
  }
  function handleClearFilters() {
    dispatch(resetFilters());
  }
  return (
    <div className="p-4 m-5 flex justify-between items-center flex-wrap">
      <SearchUser />
      <div className="flex gap-4 flex-wrap">
        <StatusFilter />
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0] ? new Date(dateRange[0]) : null}
          endDate={dateRange[1] ? new Date(dateRange[1]) : null}
          onChange={(update) => {
            handleDateChange(update);
          }}
          className="border  bg-white rounded-lg px-4 py-2"
          placeholderText="Select date range"
          dateFormat="dd.MM.yyyy"
        />
        <button
          className="py-2 px-3 bg-white rounded-lg border"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
});
