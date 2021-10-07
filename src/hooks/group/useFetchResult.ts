import { fetchResultData } from 'api/group/result'
import { useState,useCallback } from 'react';

const useFetchResult = () => {
  const [boolean, setBoolean] = useState()
  const [userData, setUserData] = useState([])

  const fetchResult = useCallback((id: number) => {
    fetchResultData(id)
    .then((res) => {
      console.log('boolean',res.data.boolean);
      console.log('ユーザー情報',res.data.userData);
      setBoolean(res.data.boolean)
      setUserData(res.data.userData)
    })
  },[])
  return {fetchResult, boolean, userData}
}
 
export default useFetchResult