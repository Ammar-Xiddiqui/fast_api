import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = () => {
  return (
    <div className='flex items-center py-10 h-[90vh] gap-15 px-10'>
        <LeftContent/>
        <RightContent/>
    </div>
  )
}

export default Page1Content