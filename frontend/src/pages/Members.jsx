import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Members = () => {
  return (
    <>
      <div className="">

        <h2>Manage Members</h2>
        <nav className='border-solid px-10  h-12 from-blue-100 bg-gradient-to-tr flex items-center gap-6 '>
          <Link to='show-member'>Show Members</Link>
          <Link to='add-member'>Add Members</Link>
        </nav>
        <Outlet />
      </div>
    </>
    
  )
}

export default Members