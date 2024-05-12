import NewPasswordForm from '@/components/auth/new-password-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function VerificationPage() {
    return (
      <div>
          <MaxWidthWrapper className='grid mx-auto gap-5 mt-20  items-center justify-center'>
          <NewPasswordForm/>
          </MaxWidthWrapper>
      </div>
    )
  }

