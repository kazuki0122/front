import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import useFetchGroup from 'hooks/group/useFetchGroup';
import { User } from 'interfaces';

const Group = () => {
  const { id } = useParams()
  const {fetchGroup, participants} = useFetchGroup()

  useEffect(() => {
    fetchGroup(id)
  },[fetchGroup, id])

  return (
    <>
      <h1>グループidは{id}</h1>
      {participants.map((participant: User) => (
        <>
          <h2>{participant.name}</h2>
        </>
      ))}
    </>
  )
}

export default Group
