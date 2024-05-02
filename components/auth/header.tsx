import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google'
import React from 'react'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface HeaderProps {
    label: string;
}
export default function HeaderComp({ label } : HeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className={cn("text-2xl font-semibold")}>
            {label}
        </h1>
    </div>
  )
}
