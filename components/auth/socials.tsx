import React from 'react'
import { Button } from '../ui/button'
// import { FaGoogle } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
export default function Social() {
  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button size='lg' 
        className='w-full' 
        variant='outline'
        // onClick={() => {}}
        >
        {`With Google`}
        </Button>
        {/* <Button size='lg' 
        className='w-full' 
        variant='outline'
        // onClick={() => {}}
        >
        <FaGithub className='w-5 h-5'/>
        </Button> */}
    </div>
  )
}
