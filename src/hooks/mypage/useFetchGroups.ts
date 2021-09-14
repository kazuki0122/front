import { fetchGroupsIndex } from "api/group/group"
import { useCallback, useState } from "react";

const useFetchGroups = () => {
  const [groups, setGroups] = useState([])
  const fetchGroups = useCallback(() => {
    fetchGroupsIndex()
    .then((res) => {
      console.log(res.data.data);
      setGroups(res.data.data)
    })
  },[])
  return {fetchGroups, groups}
}

export default useFetchGroups
