import { fetchFriendsData } from "api/friend/user"
import { useCallback, useState } from "react";

const useFetchFriends = () => {
  const [friends, setFriends] = useState([])
  const fetchFriends = useCallback(() => {
    fetchFriendsData()
    .then((res) => {
      console.log('友達一覧',res.data.data);
      setFriends(res.data.data)
    })
  },[])
  return {fetchFriends, friends}
}

export default useFetchFriends
