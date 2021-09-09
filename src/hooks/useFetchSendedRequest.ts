import { fetchSendedFriendRequest } from 'api/friend/fetchUser';

const useFetchSendedRequest = () => {
  const fetchSendedRequest = (setRequestFriends: React.Dispatch<React.SetStateAction<number[]>>) => {
    fetchSendedFriendRequest()
    .then((res) => {
      console.log('indexから返ってきた値',res.data);
      setRequestFriends(res.data.request)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return { fetchSendedRequest }
}

export default useFetchSendedRequest
