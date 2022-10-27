import React from 'react'

export default function Pagination(props) {
const goToNextPage = props.goToNextPage;
const goToPrevPage = props.goToPrevPage;

  return (
    <div>
{goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
{goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  )
}
