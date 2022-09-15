import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

const ApplicantResume = ({ viewResume, setViewResume }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageHeight, setPageHeight] = useState(window.innerHeight)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  useEffect(() => {
    const updatePageHeightWidth = () => {
      if (window.innerWidth > 1024) {
        setPageHeight(window.innerHeight - 50)
      } else {
        setPageHeight((window.innerHeight / 3) * 2)
      }
    }

    window.addEventListener('resize', updatePageHeightWidth)

    return () => window.removeEventListener('resize', updatePageHeightWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='relative z-10' role='dialog'>
      <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <button
          className='absolute rounded-full h-8 w-8 md:h-12 md:w-12 flex items-center justify-center text-lg md:text-2xl top-3 right-3 bg-white text-black z-10 ring-black ring-1'
          onClick={() => setViewResume(null)}
        >
          X
        </button>
        <div className='w-screen min-h-screen flex items-center justify-center'>
          <Document
            file={viewResume}
            onLoadSuccess={onDocumentLoadSuccess}
            className='relative group'
          >
            <Page pageNumber={pageNumber} height={pageHeight} />
            <div className='hidden group-hover:block absolute w-full bottom-3'>
              <div className='flex space-x-2 items-center bg-white text-black font-[Poppins] max-w-fit mx-auto shadow-lg rounded-md'>
                <button
                  type='button'
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className='p-2'
                >
                  {'<'}
                </button>
                <p className='px-2 border-x'>
                  {pageNumber} of {numPages}
                </p>
                <button
                  type='button'
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                  className='p-2'
                >
                  {'>'}
                </button>
              </div>
            </div>
          </Document>
        </div>
      </div>
    </div>
  )
}

export default ApplicantResume
