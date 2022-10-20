import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import SingleCompany from './SingleCompany'
import Loading from '../../Loading'
import Fuse from 'fuse.js'
import SingleView from './SingleView'
import UpdateStatus from './UpdateStatus'
import { toast } from 'react-toastify'

const CompanyView = () => {
  const [data, setData] = useState([])
  const [IsLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState([])
  const [show, setShow] = useState(false)
  const [updateCompany, setUpdateCompany] = useState(false)
  const [info, setInfo] = useState({})
  const [id, setId] = useState(null)

  const getAllCompanies = async () => {
    const response = await api.get('/company')
    setIsLoading(false)
    const { companies } = response.data
    setData(companies)
    setSearch(companies)
  }

  useEffect(() => {
    getAllCompanies()
  }, [updateCompany])

  const searchData = (pattern) => {
    if (!pattern) {
      console.log(data)
      setSearch(data)
      return
    }
    const fuse = new Fuse(data, {
      keys: ['name'],
    })

    const result = fuse.search(pattern)
    const matches = []
    if (!result.length) {
      setSearch([])
    } else {
      result.forEach(({ item }) => {
        matches.push(item)
      })
      setSearch(matches)
    }
  }

  const showView = (data) => {
    setShow(!show)
    setInfo(data)
  }

  const updateView = (id) => {
    setUpdateCompany(!updateCompany)
    setId(id)
  }

  const updateStatus = async (status) => {
    const data = { verified: status }
    await api.patch(`/admin/update/status/${id}`, data)
    toast('Status Updated Successfully', { type: 'success' })
    updateView()
  }

  if (IsLoading) return <Loading />
  if (show) return <SingleView showView={showView} {...info} />
  if (updateCompany)
    return <UpdateStatus updateView={updateView} updateStatus={updateStatus} />
  return (
    <main>
      <div className='p-4 my-0 flex  justify-center'>
        <div className=' border-1 border-black rounded-lg '>
          <input
            type='text'
            placeholder='Search....'
            onChange={(e) => searchData(e.target.value)}
            className='text-lg text-center '
          />
        </div>
      </div>
      <section className='flex flex-wrap justify-around  content-center  mx-3 p-3'>
        {search.length === 0
          ? 'No result'
          : search.map((data) => {
              return (
                <SingleCompany
                  key={data._id}
                  showView={showView}
                  updateView={updateView}
                  {...data}
                />
              )
            })}
      </section>
    </main>
  )
}

export default CompanyView
