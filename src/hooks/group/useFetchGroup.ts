import { fetchGroupData } from "api/group/group"
import { useCallback, useState } from "react"

const useFetchGroup = () => {
  const [participants, setParticipants] = useState([])
  const fetchGroup = useCallback((id: number) => {
    fetchGroupData(id)
    .then((res) => {
      setParticipants(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])
  return {fetchGroup, participants}
}

export default useFetchGroup
