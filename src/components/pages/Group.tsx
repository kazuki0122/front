import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from "react-router-dom"
const Group = () => {
  const {id} = useParams();
  console.log(id);
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/api/v1/groups/${ id }`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => { 
        console.log(err);
      });
  }
  useEffect(() => {
    fetchGroups();
  },[])

  return (
    <div>
      <h1>パラメーター</h1>
    </div>
  )
}

export default Group
