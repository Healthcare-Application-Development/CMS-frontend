import React from "react";

function Dropdown({ Label, options }) {
  return (
    <div>
      <label htmlFor={Label}>{Label}</label>
      <select name={Label} id={Label}>
        {Object.keys(options).map(key => <option value={key} key={key}>{options[key]}</option>)}
      </select>
    </div>
  );
}

export default Dropdown;
