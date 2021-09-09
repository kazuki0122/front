import { sendingFriendRequest } from "api/friend/fetchUser";
import { AuthContext } from "App";
import { useContext } from "react";

const useFriendRequest = () => {
  const { currentUser } = useContext(AuthContext)
  // const [requestFriends, setRequestFriends] = useState< number[]>([])
  
  const friendRequest = (id: number, setRequestFriends: React.Dispatch<React.SetStateAction<number[]>>) => {
    sendingFriendRequest(id, Number(currentUser?.id))
    .then((res) => {
      console.log('返ってきた値',res.data);
      console.log('currentuserが友達申請したユーザーのid',res.data.request);
      setRequestFriends(res.data.request)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return { friendRequest }
}

export default useFriendRequest
