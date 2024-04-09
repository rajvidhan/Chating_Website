import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed   z-[1000] inset-0 !mt-0 bg-white bg-opacity-10 flex items-center overflow-auto justify-center backdrop-blur-sm  font-bold' >
        <div className='w-11/12 max-w-[350px] rounded-lg border p-7 bg-richblack-800 border-richblack-400'>
            <p className='text-2xl font-semibold text-richblack-5'>{modalData.text1}</p>
            <p className='mt-3 mb-5  text-richblack-200'>{modalData.text2}</p>
            <div className='flex items-center gap-x-4'>
                <button className='bg-yellow-23 text-black px-4 py-2 rounded-lg' onClick={modalData?.btn1Handler}>
                 {modalData?.btn1Text} </button>
                <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] text-richblack-900 font-semibold' onClick={modalData?.btn2Handler}>
                   {
                    modalData?.btn2Text
                   }
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationModal
