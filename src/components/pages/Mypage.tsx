import { Button } from '@chakra-ui/react'
import { fetchSendedFriendRequest } from 'api/friend/fetchUser'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Mypage: React.VFC = () => {
  const [approval, setApproval] = useState([])
  useEffect(() => {
    fetchSendedFriendRequest()
    .then((res) => {
      console.log('マイページのindexから返ってきた値',res.data);
      console.log('申請されたユーザーのid',res.data.approval);
      setApproval(res.data.approval)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])
  return (
    <div>
      <h2>マイページ</h2>
      {
        approval.length ?
        
        <Button>承諾</Button>
        :
        <h2>友達申請はありません</h2>
      }
    </div>
  )
}

export default Mypage
