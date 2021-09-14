import { createGroupData } from "api/group/group"
import { useHistory } from "react-router-dom";
import useMessage from 'hooks/useMessage';
import { GroupParams } from "types/group";

const useCreatGroup = () => {
  const { showMessage } = useMessage()
  const history = useHistory()

  const createGroup = (params: GroupParams) => {
    createGroupData(params)
    .then((res) => {
      if (res.data.status === "success") {
        console.log(res.data.data);
        console.log(res.data.data.id)
        history.push(`/group/${res.data.data.id}`)
      } else {
        console.log(res);
        showMessage({title: `${res.data.data.name}というグループは既に存在します`, status: 'error'})
      }
    })
    .catch((err) => { 
      console.log(err);
    });
  }
  return {createGroup}
}

export default useCreatGroup
