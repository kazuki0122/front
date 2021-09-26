import { fetchGroupsIndex } from "api/group/group"
import { User } from "interfaces";
import { useCallback, useState } from "react";

const useFetchGroups = () => {
  const [acceptedUsers, setAcceptedUsers] = useState<User[]>([])
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [joinGroups, setJoinGroups] = useState([])
  const [inviteGroups, setInviteGroups] = useState([])
  const fetchGroups = useCallback( () => {
    fetchGroupsIndex()
    .then((res) => {
      setAcceptedUsers(res.data.acceptedUsers)
      setPendingUsers(res.data.pendingUsers)
      setJoinGroups(res.data.joinGroups)
      setInviteGroups(res.data.inviteGroups)
    })
  },[])
  return {fetchGroups, acceptedUsers, pendingUsers, joinGroups, inviteGroups}
}

export default useFetchGroups