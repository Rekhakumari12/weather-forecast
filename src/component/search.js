import React from 'react';
const search = ({getInput}) => {
  return (
    <div className="search_div">
      <input type="search" className="search" onChange={getInput} placeholder="city/country/state" />
    </div>
  )
}
export default search;