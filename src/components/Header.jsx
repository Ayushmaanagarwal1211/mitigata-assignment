import { Download } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">User Details</h1>
          <p className="text-gray-600 text-2xl">
            Information about users, including name, email, start date, inviter, status, and available actions.
          </p>
        </div>
        <button className="flex items-center gap-2 text-2xl bg-black text-white px-4 py-2 rounded-lg">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>
  )
}
