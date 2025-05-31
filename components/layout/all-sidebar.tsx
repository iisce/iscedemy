'use client';
import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { SIDEBAR_LINKS_ADMIN, SIDEBAR_LINKS_STUDENT, SIDEBAR_LINKS_TUTOR } from '@/lib/consts';
import { NavbarButton } from './navbar-button';
import { Separator } from '../ui/separator';
import SignOutButton from '../ui/sign-out';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

export default function AllSidebar({user}: {user?: User}) {
const session =  useSession()

    if(session.status === 'loading') {
        <div className="no-scrollbar z-10 hidden h-full w-52 justify-between overflow-y-scroll bg-secondary px-5 md:flex">
        <div className="flex h-full w-full flex-col gap-3 pt-20">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded bg-primary/30" />
          ))}
        </div>
      </div>
    }
  return (
    <div className='no-scrollbar  overflow-x-hidden z-10 hidden h-full w-52 justify-between overflow-y-hidden  px-5 md:flex'>
        <div className="flex h-full w-full flex-col gap-3 pt-20">
            {(user?.role?.toLowerCase() === 'tutor' 
                ? SIDEBAR_LINKS_TUTOR
                : user?.role?.toLowerCase() === 'student' 
                ? SIDEBAR_LINKS_STUDENT
                : user?.role?.toLowerCase() === 'admin'
                ? SIDEBAR_LINKS_ADMIN
                :[]
            ).map((item, i) => (
                <NavbarButton
                key={i}
                title={item.name}
                href={item.link}
                icon={<item.icon />}
                />
            ))}
            <Separator/>
            <SignOutButton user={user} />
        </div>

    </div>
  )
}
