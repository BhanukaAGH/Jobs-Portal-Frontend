import React, { useState, useEffect } from 'react'
import Create from './Account/Create'
import ViewAccounts from './Account/ViewAccounts'
import api from '../../utils/api'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const AdminDashboard = () => {
  const [model, setModel] = useState(false)
  const [users, setUsers] = useState([])

  const getAllUser = async () => {
    const res = await api.get('/admin/users/allUsers')
    const { users: allUsers } = res.data
    setUsers(allUsers)
  }

  useEffect(() => {
    getAllUser()
  }, [])

  const modelOpen = () => {
    setModel(!model)
  }

  const generateReport = () => {
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = 'Users Report Of the system'
    const headers = [['NAME', 'Email', 'TYPE']]

    const data = users.map((elt) => [
      elt.name,
      elt.email,
      elt.role,
      elt.photoUrl,
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('report.pdf')
  }

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Dashboard</h3>
        <button
          className='rounded-lg py-1 px-3 text-sm font-bold  text-white transition duration-500 ease-out bg-black mt-3 ml-3'
          onClick={modelOpen}
        >
          Create Admin
        </button>
        <button
          className='rounded-lg py-1 px-3 text-sm font-bold  text-white transition duration-500 ease-out bg-purple-600 mt-3 ml-3'
          onClick={generateReport}
        >
          Generate Report
        </button>
      </div>
      {/* Dashboard Content */}

      <div className='dashboard-content'>
        <div className='flex flex-1 overflow-hidden relative h-full w-full'>
          <div className='absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
            {/* Type Code here */}
            <ViewAccounts />
            {model ? <Create modelOpen={modelOpen} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
