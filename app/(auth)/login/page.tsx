import { LoginForm } from '@/components/component/login-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function Login() {
  return (
    <div>
        <MaxWidthWrapper className='text-black grid gap-5 my-4 relative '>
            <LoginForm/>
        </MaxWidthWrapper>
    </div>
  )
}
