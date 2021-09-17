import { createMessageData } from "api/message/message"
import { useCallback } from "react";
import {  Message, MessageParams } from "types/message";

const useCreateMessage = () => {

  const createMessage = useCallback( async (id: number, params: MessageParams,allUsersMessages: Message[], setAllUsersMessages:React.Dispatch<React.SetStateAction<Message[]>> ) => {
    await createMessageData(id, params)
    .then((res) => {
      console.log('メッセージ作成done',res.data.data);
      setAllUsersMessages([...allUsersMessages, res.data.data ])
    })
  },[])
  return {createMessage}
}

export default useCreateMessage
