import { fetchMessageData } from "api/message/message"
import { useCallback } from "react"
import { Message } from "types/message"

const useFetchMessages = () => {

  const fetchMessages = useCallback(async (id: number, setAllUsersMessages:React.Dispatch<React.SetStateAction<Message[]>>) => {
    await fetchMessageData(id)
    .then(async(res) => {
      console.log('メッセージ取得',res.data.allUsers);
      setAllUsersMessages(res.data.allUsers)
    })
  },[])
  return {fetchMessages}
}

export default useFetchMessages
