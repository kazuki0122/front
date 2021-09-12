import { fetchSendedFriendRequest } from "api/friend/fetchUser";
import { useCallback, useState } from "react";

const useFetchFriendRequest = () => {
  const [approval, setApproval] = useState([])
  // const [users, setUsers] = useState([])
  const fetchRequestData = useCallback( async (setUsers: React.Dispatch<React.SetStateAction<never[]>>) => { 
    console.log('動いてる！');
    await fetchSendedFriendRequest()
    .then((res) => {
      console.log('マイページのindexから返ってきた値',res.data);
      console.log('申請を送ってきたユーザーのid',res.data.approval);
      console.log('申請を送ってきたユーザーのname',res.data.users);
      setApproval(res.data.approval)
      setUsers(res.data.users)
    })
    .catch((err) => {
      console.log("HTTP通信失敗");
      console.log(err);
    })
  },[])
  return {fetchRequestData, approval}
}

export default useFetchFriendRequest
