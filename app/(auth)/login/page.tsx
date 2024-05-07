import LoginForm from '@/components/auth/login-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function Login() {
  return (
    <div>
        <MaxWidthWrapper className='grid mx-auto gap-5 my-4  items-center justify-center'>
            <LoginForm/>
        </MaxWidthWrapper>
    </div>
  )
}
