'use client'

import Sidebar from './_components/sidebar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 scoll-y-hidden'>

      {/* Content */}
      <div className='w-full order-1 lg:order-2 overflow-auto h-screen'>
        {children}
      </div>

      {/* Sidebar */}
      <div className='order-2 lg:order-1'>
        <Sidebar />
      </div>
    </div>
  )
}