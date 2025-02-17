import React from 'react'
import { Users, UserCheck, UserX } from "lucide-react"; // Lucide icons
import { useSelector } from 'react-redux';
import { selectData } from '../slices/TableSlice';

export default function Stats() {
  const filteredData = useSelector(state=>selectData(state))

      const stats = React.useMemo(() => {
        const total = filteredData.length;
        const blocked = filteredData.filter(user => user.about.status.toLowerCase() === 'blocked').length;
        const inactive = filteredData.filter(user => user.about.status.toLowerCase() === 'inactive').length;
        
        return {
          total,
          blockedPercentage: ((blocked / total) * 100).toFixed(1),
          inactivePercentage: ((inactive / total) * 100).toFixed(1),
        };
      }, [filteredData]);


      const items = [
        { icon: <Users size={52} color='green'/>, title: "Total Users", value: stats.total },
        { icon: <UserCheck size={52} color='green' />, title: "Active Users", value: (100 - (+stats.blockedPercentage + +stats.inactivePercentage)) },
        { icon: <UserX size={52} color='green'/>, title: "Inactive Users", value: stats.inactivePercentage },
        { icon: <UserX size={52} color='green' />, title: "Blocked Users", value: stats.blockedPercentage },
      ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
    {items.map((stat, index) => (
      <div key={index} className="flex items-center  bg-white shadow-md rounded-xl px-4 py-10  border-[1px] border-gray-300">
        <div className="p-3  bg-green-100 rounded-lg">{stat.icon}</div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-md font-semibold">{stat.title}</h3>
          <p className="text-4xl font-bold mt-2  text-gray-700">{stat.value + (index>=2 && "%")}</p>
        </div>
      </div>
    ))}
  </div>
  )
}
