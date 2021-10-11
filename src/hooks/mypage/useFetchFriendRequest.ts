import { fetchSendedFriendRequest } from "api/friend/user";
import { useCallback } from "react";

const useFetchFriendRequest = () => {
  const fetchRequestData = useCallback( async (setFriendRequest: React.Dispatch<React.SetStateAction<never[]>>) => { 
    console.log('動いてる！');
    await fetchSendedFriendRequest()
    .then((res) => {
      console.log('マイページのindexから返ってきた値',res.data);
      console.log('申請を送ってきたユーザーのid',res.data.approval);
      console.log('申請を送ってきたユーザーのname',res.data.users);
      setFriendRequest(res.data.users)
    })
    .catch((err) => {
      console.log("HTTP通信失敗");
      console.log(err);
    })
  },[])
  return {fetchRequestData}
}

export default useFetchFriendRequest
