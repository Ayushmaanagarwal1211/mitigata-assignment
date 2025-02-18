import React from 'react'
import Header from './components/Header';
import Table from './components/Table';
import Stats from './components/Stats';
export default function App() {
 

  return (
    <div className="min-h-screen bg-gray-100 p-10 max-md:p-1">
          <div className="p-8 mb-10">
              <Header/>
          </div>
          <Stats/>
          <Table/>
    </div>
  )
}
