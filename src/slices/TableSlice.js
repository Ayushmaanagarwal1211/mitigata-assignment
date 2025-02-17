import { createSlice } from "@reduxjs/toolkit";

function handleSortForSearchTerm(data, searchTerm) {
  return data.filter(
    (item) =>
      item.about.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.about.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function handleSortForDateRange(data, dateRange) {
  return data.filter((item) => {
    const dateStr = item.details.date;
    const [day, month, year] = dateStr
      .split(".")
      .map((num) => parseInt(num, 10));

    const itemDate = new Date(year, month - 1, day);
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    const isWithinRange = itemDate >= startDate && itemDate <= endDate;

    return isWithinRange;
  });
}

function handleSortForColumn(data, sortConfig) {
  return data.sort((a, b) => {
    let aValue =["name","status","email"].includes(sortConfig.key)
                  ? a.about[sortConfig.key]
                  : a.details[sortConfig.key];
                let bValue = ["name","status","email"].includes(sortConfig.key)
                  ? b.about[sortConfig.key] 
                  : b.details[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction == "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction == "asc" ? 1 : -1;
    return 0;
  });
}

const TableSlice = createSlice({
  name: "Table",
  initialState: {
    filteredData: [],
    data: [],
    sortingOptions: {
      searchTerm: "",
      statusFilter: "",
      dateRange: [null, null],
      sortConfig: { key: null, direction: "asc" },
    },
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setSortingOptions : (state,action)=>{
      state.sortingOptions[action.payload.type] = action.payload.data
    },

    handleFilter: (state) => {
      let filtered = [...state.data];
      const { searchTerm, statusFilter, dateRange, sortConfig } =
        state.sortingOptions;
      if (searchTerm) {
        filtered = handleSortForSearchTerm(filtered, searchTerm);
      }
      if (statusFilter) {
        filtered = filtered.filter(
          (item) => item.about.status.toLowerCase() == statusFilter
        );
      }

      if (dateRange[0] && dateRange[1]) {
        filtered = handleSortForDateRange(filtered, dateRange);
      }

      if (sortConfig.key) {
        filtered = handleSortForColumn(filtered, sortConfig);
      }
      state.filteredData = filtered;
    },

    handleChangeStatus: (state, action) => {
      const { status, id } = action.payload;
      if (["active", "inactive", "blocked"].includes(status)) {
        state.data = state.data.map((item) =>
          item.id == id ? { ...item, about: { ...item.about, status } } : item
        );
      }
    },

    resetFilters: (state) => {
      state.sortingOptions.searchTerm = "";
      state.sortingOptions.statusFilter = "";
      state.sortingOptions.dateRange = [null, null];
      state.sortingOptions.sortConfig = { key: null, direction: "asc" };
    },
  },
});

export function selectFilteredData(state) {
  return state.table.filteredData;
}
export function selectData(state) {
  return state.table.data;
}


export function selectSortingOptions(state) {
  return state.table.sortingOptions;
}
  

export const {
  setData,
  setFilteredData,
  handleFilter,
  handleColumnSorting,
  handleChangeStatus,
  resetFilters,
  setSortingOptions
} = TableSlice.actions;

export default TableSlice.reducer;
