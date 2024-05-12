import Resetorm from '@/components/auth/reset-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function ResetPage() {
  return (
    <div> 
        <MaxWidthWrapper className='grid mx-auto gap-5 mt-20   items-center justify-center'>
        <Resetorm/>
        </MaxWidthWrapper>
    </div>
  )
}
