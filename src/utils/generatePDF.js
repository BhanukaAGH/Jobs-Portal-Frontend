import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'
import api from './api'

const generatePDF = async (companyName, companyId, jobs) => {
  const doc = new jsPDF({ format: 'a4' })

  const response = await api.get(`/applicant/${companyId}`)
  const applicants = response.data.applicants

  const jobsTableColumn = [
    'ID',
    'Title',
    'Job Category',
    'Job Type',
    'Work Type',
    'Country',
    'Posted Date',
  ]

  const applicantsTableColumn = [
    'ID',
    'Name',
    'Primary Role',
    'Job Status',
    'Apply Date',
    'Resume',
  ]

  const jobsTableRows = []
  jobs.forEach((job, index) => {
    const jobRowData = [
      ++index,
      job?.jobTitle,
      job?.jobCategory,
      job?.jobType,
      job?.workType,
      job?.country,
      moment(job?.createdAt).format('YYYY-MM-DD'),
    ]
    jobsTableRows.push(jobRowData)
  })

  doc.text(`${companyName.toUpperCase()} - JOBS REPORT`, 70, 15)
  doc.setFontSize(10)
  doc.setTextColor('gray')
  doc.text(
    `created : ${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}`,
    70.5,
    20
  )

  autoTable(doc, {
    head: [jobsTableColumn],
    body: jobsTableRows,
    headStyles: { fillColor: 'black' },
    startY: 28,
  })

  jobs.map((job, i) => {
    const data = applicants.filter((item) => item.JobID === job._id)

    doc.setFontSize(12)
    doc.setTextColor('black')
    doc.text(
      `${++i < 10 ? '0' : ''}${i}.   ${job.jobTitle} Applicants`,
      14,
      doc.lastAutoTable.finalY + 14
    )

    const applicantTableRows = []
    data.forEach((applicant, index) => {
      const applicantRowData = [
        ++index,
        applicant?.userID?.name,
        applicant?.ResumeID?.PrimaryRole,
        applicant?.ApplicationStatus,
        moment(applicant?.createdAt).format('Do MMM, yyyy'),
      ]
      applicantTableRows.push(applicantRowData)
    })

    return autoTable(doc, {
      head: [applicantsTableColumn],
      body: applicantTableRows,
      headStyles: { fillColor: 'black' },
      startY: doc.lastAutoTable.finalY + 18,
      didDrawCell: (tableData) => {
        if (tableData.section === 'body' && tableData.column.index === 5) {
          doc.textWithLink(
            'resume',
            tableData.cell.x + 2,
            tableData.cell.y + 4.5,
            {
              url: data[tableData.row.index]?.ResumeID?.CV,
            }
          )
        }
      },
    })
  })

  doc.save(`jobs-report.pdf`)
}

export default generatePDF
