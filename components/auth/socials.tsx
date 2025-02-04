import React from 'react'
import { Button } from '../ui/button'
import {  FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  }

  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button size='lg' 
        className='w-full rounded-full' 
        variant='outline'
        onClick={() => onClick("google")}
        >
          <FaGoogle className='w-5 h-5'/>
        </Button>
         <Button size='lg' 
        className='w-full rounded-full' 
        variant='outline'
        onClick={() => onClick("github")}
        >
        <FaGithub className='w-5 h-5'/>
        </Button> 
    </div>
  )
}
