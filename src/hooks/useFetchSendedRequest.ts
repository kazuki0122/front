import { fetchSendedFriendRequest } from 'api/friend/fetchUser';
import { useCallback } from 'react';

const useFetchSendedRequest = () => {
  const fetchSendedRequest = useCallback((setRequestFriends: React.Dispatch<React.SetStateAction<number[]>>) => {
    fetchSendedFriendRequest()
    .then((res) => {
      console.log('indexから返ってきた値',res.data);
      setRequestFriends(res.data.request)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])
  return { fetchSendedRequest }
}

export default useFetchSendedRequest
