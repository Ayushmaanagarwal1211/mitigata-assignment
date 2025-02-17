import React, { useEffect } from 'react'
import UserTable from './components/UserTable';
import data from './data.json';
import Header from './components/Header';
import { selectData, setData, setFilteredData } from './slices/TableSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function App() {
  const dummy_data = data;
  const dispatch  = useDispatch();
  const main_data = useSelector(state=>selectData(state))
  useEffect(()=>{
    dispatch(setData(data))
    dispatch(setFilteredData(data))
  },[])

useEffect(()=>{
  dispatch(setFilteredData(main_data))
},[main_data])

  return (
    <div className="min-h-screen bg-gray-100 p-10">
          <div className="p-8 mb-10">
              <Header/>
          </div>
      <UserTable data={dummy_data} />
    </div>
  )
}
