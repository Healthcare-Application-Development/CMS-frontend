import React from "react";

function Dropdown({ Label, options, onClick }) {
  return (
    <div className="flex flex-col m-4 gap-1">
      <label htmlFor={Label}>{Label}</label>
      <select name={Label} id={Label} className="border-none p-2 text-gray-800 rounded-lg w-[256px]" onClick={(e) => {
          onClick(e.target.value)}
        }>
        {Object.keys(options).map(key => <option value={key} key={key}>{options[key]}</option>)}
      </select>
    </div>
  );
}

export default Dropdown;
