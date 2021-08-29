import React from 'react'
import { useParams } from "react-router-dom"
const Group = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>パラメーター{ id }</h1>
    </div>
  )
}

export default Group
