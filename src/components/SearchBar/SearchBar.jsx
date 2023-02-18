import React from 'react'

function SearchBar() {
  return (
    <div className="flex items-center mx-[33%]">
        <input
          type="text"
          placeholder="Search ABHA ID"
          className="bg-gray-600 text-white h-[42px] p-4 m-4 rounded-[20px] my-2"
        />
        <div className="bg-black p-2 w-14 flex items-center justify-center rounded-[20px]">
          <img src="/lens.png" alt="Search" className="cursor-pointer" />
        </div>
      </div>
  )
}

export default SearchBar