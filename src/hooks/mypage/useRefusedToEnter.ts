import { refused } from "api/group/group"

const useRefusedToEnter = () => {
  // const {fetchGroups} = useFetchGroups()
  const refusedToEnter = async () => {
    await refused()
    .then((res) => {
      console.log('削除',res.data.data);
      console.log('削除成功！');
    })
  }
  return {refusedToEnter}
}

export default useRefusedToEnter
