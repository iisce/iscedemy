
import { auth } from '@/auth'
import React from 'react'

export default async function StudentDashboard() {
const session = await auth()

  return (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  )
}
