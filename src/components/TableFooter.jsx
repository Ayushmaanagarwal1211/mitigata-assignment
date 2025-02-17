import React, { useEffect ,useState} from 'react'
import { selectFilteredData, setPaginatedData } from '../slices/TableSlice';
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export default function TableFooter() {
    const filteredData = useSelector(state=>selectFilteredData(state));
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPaginatedData(paginatedData))
    },[currentPage, itemsPerPage,filteredData])
console.log(new Array(Math.ceil(paginatedData.length/10)).fill((_,index)=>index+1),'sdsdsdsd')
  return (
    <div className="p-4  flex items-center  justify-center mt-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              {'<<'}
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 px-3 border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              {'<'}
            </button>
            <div className="flex items-center gap-2">
            <span className="text-lg text-black">
             <span className='font-semibold'> Page</span> <select
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(e.target.value);
              }}
              className=" rounded-lg border-[1px] border-gray-400 px-4 py-2  bg-white"
            >
              {Array.from({length:Math.ceil(filteredData.length/10)},(_,index)=>index+1).map((size) => (
                <option key={size} value={size}>
                   {size}
                </option>
              ))}
            </select> of {totalPages}
            </span>
            
          </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 px-3 border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              {'>'}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2  border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              {'>>'}
            </button>
          </div>
         
        </div>
  )
}
