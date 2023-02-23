import React from 'react'

function Button({txt,color, onClick}) {
  return (
    <div className={`bg-${color}-500 p-3 rounded-md opacity-95 cursor-pointer`} onClick={() => onClick()}>{txt}</div>
  )
}

export default Button