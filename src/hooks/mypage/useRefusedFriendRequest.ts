import { refusedFriend } from "api/friend/user"

const useRefusedFriendRequest = () => {
  const refusedFriendRequest = async (id: number) => {
   await refusedFriend(id)
   .then((res) => {
      console.log(res.data.data);
   })
  }
  return {refusedFriendRequest}
}

export default useRefusedFriendRequest
