import React from 'react'

function WidgetsContent({id,item,index}) {
  return (
    <div>
        <p>{item}</p>
        <p>{id}</p>
        <p>{index}</p>
    </div>
  )
}

export default WidgetsContent