import React from 'react'
import { BiBookAdd } from 'react-icons/bi'

const page = () => {
  return (
    <div>
     <div className='mt-4 flex justify-end'>
        <button className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg'><BiBookAdd/> Add Category</button>
     </div>
    </div>
  )
}

export default page
