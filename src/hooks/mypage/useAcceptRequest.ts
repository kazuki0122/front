import { accept } from "api/group/group"
const useAcceptRequest = () => {

  const acceptRequest = async (id: number) => {
    await accept(id)
    .then((res) => {
      console.log('入室したよ',res.data.data);
    })
  }
  return {acceptRequest}
}

export default useAcceptRequest

