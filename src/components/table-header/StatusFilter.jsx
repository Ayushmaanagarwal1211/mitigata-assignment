import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, selectStatusFilter, setStatusFilter } from '../../slices/TableSlice';

export default function StatusFilter() {
    const dispatch = useDispatch();
  const statusFilter = useSelector(state=>selectStatusFilter(state))

  function handleChange(e){
    dispatch(setStatusFilter(e.target.value))
    dispatch(handleFilter())
  }

  return (
    <select
                  value={statusFilter}
                  onChange={handleChange}
                  className="border rounded-lg bg-white px-4 py-2"
                >
                  <option value="">Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="INVITED">Invited</option>
                </select>
  )
}
