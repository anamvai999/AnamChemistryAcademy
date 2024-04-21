import React from 'react'

const ShadowCard = ({children, className}) => {
  return (
    <div className={`${className} p-4 bg-white shadow-lg rounded-lg mb-4`}>
      {children}
    </div>
  )
}

export default ShadowCard
