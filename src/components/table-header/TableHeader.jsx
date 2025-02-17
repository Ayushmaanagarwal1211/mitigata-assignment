import React from 'react'
import SearchUser from './SearchUser';
import StatusFilter from './StatusFilter';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, selectDateRange, setDateRange } from '../../slices/TableSlice';

export default function TableHeader() {
    const dateRange = useSelector(state=>selectDateRange(state))
    const dispatch = useDispatch();

 function handleChange(update){
    const values = update.map(date => date ? date.toISOString() :null);
    dispatch(setDateRange(values))
    dispatch(handleFilter())
  }

  return (
    <div className="p-4 flex justify-between items-center">
              <SearchUser/>
              <div className="flex gap-4">
                <StatusFilter/>
                <DatePicker
                  selectsRange={true}
                  startDate={dateRange[0] ? new Date(dateRange[0]):null}
                  endDate={dateRange[1] ?new Date(dateRange[1])  :null}
                  onChange={(update) => {
                    handleChange(update);
                  }}
                  className="border  bg-white rounded-lg px-4 py-2"
                  placeholderText="Select date range"
                  dateFormat="dd.MM.yyyy"
                />
              </div>
            </div>
  )
}
