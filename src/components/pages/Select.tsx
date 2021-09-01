import axios from 'axios';
import { User } from 'interfaces';
import React, { useEffect, useState } from 'react'
import Sele from 'react-select';


const Select: React.VFC = () => {
  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/api/v1/users')
      .then((res) => {
        setUsers(res.data.data)
        console.log(res.data.data);
      })
      .catch((err) => { 
        console.log(err);
      });
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
  },[setUsers])

  const handleChange = (value: any): void => {
    console.log(value);
    const uid = value.map((user: User) => user.id)
    console.log(uid);
    
  }

  return (
    <>
      <Sele
        isMulti
        name="colors"
        onChange={handleChange}
        options={users}
        getOptionValue={option => option["id"]}
        getOptionLabel={option =>
          option["name"]
        }
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </>
  )
}

export default Select
