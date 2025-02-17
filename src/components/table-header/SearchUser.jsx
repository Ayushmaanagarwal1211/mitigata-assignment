import React, { useState } from 'react'
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, selectData, selectFilteredData, selectSearchTerm, setFilteredData, setSearchTerm } from '../../slices/TableSlice';

export default function SearchUser() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state=>selectSearchTerm(state))

  function handleChange(e){
    dispatch(setSearchTerm(e.target.value))
    dispatch(handleFilter())
  }

  return (
    <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 border-[1px] border-gray-400 bg-white rounded-lg w-64"
                  placeholder="Search users..."
                  
                />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  )
}
