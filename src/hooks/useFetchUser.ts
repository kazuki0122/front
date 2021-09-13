import { fetchUserData } from "api/friend/fetchUser"
import { useCallback, useState } from "react"

const useFetchUser = () => {
  // ユーザーの情報
  const [users, setUsers] = useState([])

  // ページネーションの情報 usehook
  const [count, setCount] = useState()
  const [current, setCurrent] = useState<number | undefined>()
  const [limit_value, setLimit_value] = useState()
  const [next, setNext] = useState()
  const [pages, setPages] = useState<number | undefined>()
  const [privious, setPrivious] = useState()

  const fetchUser = useCallback((pageData: number) => {
    try {
      fetchUserData(pageData)
      .then((res) => {
        console.log('ページネーション',res.data.pages.pagenation);
        console.log('ユーザーのデータ',res.data.data);
        console.log(res.data.data)
        
        // ページネーションの情報取得
        setCount(res.data.pages.pagenation.count);
        setCurrent(res.data.pages.pagenation.current);
        setLimit_value(res.data.pages.pagenation.limit_value);
        setNext(res.data.pages.pagenation.next);
        setPages(res.data.pages.pagenation.pages);
        setPrivious(res.data.pages.pagenation.privious);
        
        setUsers(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
    } catch(error) {
      console.error('失敗です', error);
    }
  },[])
  return {fetchUser, count, current, limit_value, next, pages, privious, users}
}

export default useFetchUser
