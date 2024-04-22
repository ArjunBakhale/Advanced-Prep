'use client'

import React, { useState, useContext } from 'react'

const SidebarContext = React.createContext()

export const useSidebar = () => useContext(SidebarContext)

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen }}>
      <div
        className={`fixed top-0 right-${
          isOpen ? '0' : '-full'
        } z-50 h-full w-1/4 bg-gray-800 text-white transition-all duration-500`}
      >
        <button onClick={toggleOpen}>Toggle</button>
        <p>Some content here</p>
      </div>
    </SidebarContext.Provider>
  )
}

export default SideBar
