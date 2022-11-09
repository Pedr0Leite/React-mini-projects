import React from 'react'

export default function Pagination(props) {
const goToNextPage = props.goToNextPage;
const goToPrevPage = props.goToPrevPage;

  return (
    <div className="grid grid-cols-2 gap-2">
{goToPrevPage && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-l-lg" onClick={goToPrevPage}>Previous</button>}
{goToNextPage && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-r-lg" onClick={goToNextPage}>Next</button>}
    </div>
  )
}
