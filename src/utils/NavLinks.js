import {
  MdOutlineDomain,
  MdOutlineBusinessCenter,
  MdOutlineEventNote,
  MdOutlineDashboard,
  MdAssignment,
} from 'react-icons/md'
import CompanyDashboard from '../components/Company/CompanyDashboard'
import EventDashboard from '../components/Company/EventDashboard'
import JobDashboard from '../components/Company/JobDashboard'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AdminCompany from '../components/Admin/AdminCompany'
import EventReport from '../components/Admin/EventReport'

export const companyLinks = [
  {
    id: 'CN1',
    name: 'Company',
    icon: MdOutlineDomain,
    element: CompanyDashboard,
  },
  {
    id: 'CN2',
    name: 'Jobs',
    icon: MdOutlineBusinessCenter,
    element: JobDashboard,
  },
  {
    id: 'CN3',
    name: 'Events',
    icon: MdOutlineEventNote,
    element: EventDashboard,
  },
]

export const adminLinks = [
  {
    id: 'AD1',
    name: 'Admin',
    icon: MdOutlineDashboard,
    element: AdminDashboard,
  },
  {
    id: 'AD2',
    name: 'Company',
    icon: MdOutlineDomain,
    element: AdminCompany,
  },
  {
    id: 'AD3',
    name: 'Events Report',
    icon: MdAssignment,
    element: EventReport,
  },
]
