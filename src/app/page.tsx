import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Link href={'/signin'}>
       Sign In
      </Link>
      <Link href={'/signup'}>
        Sign Up
      </Link>
    </div>
  )
}

export default page
