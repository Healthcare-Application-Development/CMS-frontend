import React from 'react'

function Button({txt,color, onClick}) {
  return (
    <button className={`bg-${color} p-3 rounded-md opacity-95 cursor-pointer`} onClick={() => onClick()}>{txt}</button>
  )
}

export default Button