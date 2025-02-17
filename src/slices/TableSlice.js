import { createSlice } from "@reduxjs/toolkit";

const TableSlice = createSlice({
    name: "Table",
    initialState : {
        filteredData : [],
        data : [],
        searchTerm : '',
        statusFilter : '', 
        dateRange : [null,null],
        sortConfig : {key:null,direction:'asc'},
        paginatedData : []
    },
    reducers : {
       setData : (state,action) => {
           state.data = action.payload
    
       },
       setPaginatedData : (state,action) => {
        state.paginatedData = action.payload
    },
       setFilteredData : (state,action) => {
           state.filteredData = action.payload
        },
        setSearchTerm : (state,action) => {state.searchTerm = action.payload},
        setStatusFilter : (state,action) => {state.statusFilter = action.payload},
        setDateRange: (state, action) => {
            state.dateRange = action.payload
        }
,        
        setSortConfig : (state,action) => {state.sortConfig = action.payload},

        handleFilter : (state,action) => {
                let filtered = [...state.data];
                const dateRange = state.dateRange
                if (state.searchTerm) {
                    filtered = filtered.filter(item => 
                      item.about.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                      item.about.email.toLowerCase().includes(state.searchTerm.toLowerCase())
                    );
                  }
                    if (state.statusFilter) {
                      filtered = filtered.filter(item => item.about.status === state.statusFilter);
                    }
                
                    if (dateRange[0] && dateRange[1]) {
                        filtered = filtered.filter(item => {
                          const dateStr = item.details.date; 
                          const [day, month, year] = dateStr.split('.').map(num => parseInt(num, 10));
                          
                          const itemDate = new Date(year, month - 1, day);
                          const startDate = new Date(dateRange[0]);
                         const endDate = new Date(dateRange[1]);
                         const isWithinRange = itemDate >= startDate && itemDate <= endDate;
                  
                  return isWithinRange;
                        });
                      } 
                      
                
                    if (state.sortConfig.key) {
                      filtered.sort((a, b) => {
                        let aValue = state.sortConfig.key?.includes('about') 
                          ? a.about[state.sortConfig.key.split('.')[1]]
                          : a.details[state.sortConfig.key ];
                        let bValue = state.sortConfig.key?.includes('about')
                          ? b.about[state.sortConfig.key.split('.')[1]]
                          : b.details[state.sortConfig.key];
                
                        if (aValue < bValue) return state.sortConfig.direction === 'asc' ? -1 : 1;
                        if (aValue > bValue) return state.sortConfig.direction === 'asc' ? 1 : -1;
                        return 0;
                      });
                    }
                state.filteredData = filtered
        },
        handleColumnSorting : (state,action) => {
            let filtered = [...state.filteredData];
            const sortConfig = action.payload;
            filtered.sort((a, b) => {
                let aValue =["name","status","email"].includes(sortConfig.key)
                  ? a.about[sortConfig.key]
                  : a.details[sortConfig.key];
                let bValue = ["name","status","email"].includes(sortConfig.key)
                  ? b.about[sortConfig.key] 
                  : b.details[sortConfig.key];
        
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
              });

              state.filteredData = filtered
        },
        handleChangeStatus : (state,action) => {
            const {status, id} = action.payload
            if(["active","inactive","blocked"].includes(status)){
                state.data = state.data.map((item) => item.id==id? {...item,about:{...item.about,status}} : item)
            }
        }
    }
})
export function selectFilteredData(state){
    return state.table.filteredData
}
export function selectData(state){
    return state.table.data
}
export function selectSearchTerm(state){
    return state.table.searchTerm
}
export function selectStatusFilter(state){
    return state.table.statusFilter
}

export function selectDateRange(state){
    return state.table.dateRange
}

export function selectPaginatedData(state){
    return state.table.paginatedData
}

export const  {setData, setFilteredData,handleFilter,setPaginatedData,setDateRange,setSearchTerm,setSortConfig,setStatusFilter,handleColumnSorting,handleChangeStatus} = TableSlice.actions
export default TableSlice.reducer