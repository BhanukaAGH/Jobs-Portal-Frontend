import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

const ApplicantResume = ({ viewResume, setViewResume }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageScale, setPageScale] = useState(1)

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

  const increaseScale = () => {
    setPageScale((scale) => scale + 0.1)
  }

  const decreaseScale = () => {
    setPageScale((scale) => scale - 0.1)
  }

  useEffect(() => {
    const handleScale = () => {
      if (window.innerWidth < 640) {
        setPageScale(0.6)
      } else if (window.innerWidth < 768) {
        setPageScale(0.8)
      } else if (window.innerWidth < 1024) {
        setPageScale(0.9)
      }
    }

    handleScale()
  }, [])

  return (
    <div className='relative z-10' role='dialog'>
      <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto !scrollbar-thin !scrollbar-track-white !scrollbar-thumb-gray-800'>
        <button
          className='fixed rounded-full h-8 w-8 md:h-12 md:w-12 flex items-center justify-center text-lg md:text-2xl top-3 right-3 bg-white text-black z-10 ring-black ring-1'
          onClick={() => setViewResume(null)}
        >
          X
        </button>
        <div className='w-screen min-h-screen flex items-center justify-center'>
          <Document
            file={viewResume}
            onLoadSuccess={onDocumentLoadSuccess}
            className='relative group overflow-auto scrollbar-hide'
            loading={
              <span className='text-white animate-bounce'>Loading PDF…</span>
            }
          >
            <Page pageNumber={pageNumber} scale={pageScale} />
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

          <div className='flex flex-col items-center justify-between fixed bottom-4 right-4 divide-y-2 rounded overflow-hidden ring-black ring-1'>
            <button
              className='bg-white text-black z-10 h-8 w-8 flex items-center justify-center text-lg md:text-2xl'
              onClick={increaseScale}
            >
              +
            </button>
            <button
              className='bg-white text-black z-10 h-8 w-8 flex items-center justify-center text-lg md:text-2xl'
              onClick={decreaseScale}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantResume
