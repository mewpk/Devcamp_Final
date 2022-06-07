import React from 'react'
import { useParams } from 'react-router-dom'

export default function Show() {
    let country = useParams();
    console.log(country);
  return (
    <div>Show
        {/* <p>{id}</p> */}
    </div>
  )
}
