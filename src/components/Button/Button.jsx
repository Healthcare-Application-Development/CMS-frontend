import React from 'react'

function Button({txt,color}) {
  return (
    <div className={`bg-${color}-500 p-3 rounded-md opacity-95`}>{txt}</div>
  )
}

export default Button