import React, { useEffect } from 'react'
import { useState } from 'react';
import { Avatar, Box, Button, Divider, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import { User } from 'interfaces';
import Pagination from './Pagination'
import useFetchUser from 'hooks/useFetchUser';
import useFriendRequest from 'hooks/useFriendRequest';
import useFetchSendedRequest from 'hooks/useFetchSendedRequest';

const Users: React.VFC = () => {
  const [requestFriends, setRequestFriends] = useState< number[]>([])

  // hooks 
  // ユーザー情報とページネーションの情報を取得
  const { fetchUser, count, current, limit_value, next, pages, privious, users } = useFetchUser()
  // 友達申請
  const { friendRequest } = useFriendRequest()
  // 申請状況
  const { fetchSendedRequest } = useFetchSendedRequest()

  // apiに送るページ番号
  const [pageData, setPageData] = useState(1) 

  // ユーザー情報の取得
  useEffect(() => {
    fetchUser(pageData)
  },[pageData])

  // 友達申請
  const handleFriendRequest = (id: number) => friendRequest(id, setRequestFriends)

  // 申請状況を取得
  useEffect(() => {
    fetchSendedRequest(setRequestFriends)
  },[])

  return (
    <>
      <Stack textAlign='center' mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>ユーザー一覧</Heading>
      </Stack>
      <Pagination
        pages={pages}
        current={current}
        setPageData={setPageData}
      />
      <Box textAlign='center' mx={'auto'} maxW={'xl'}>
        {console.log(requestFriends)}
        {users.map((user: User) => (
          <>
            <Flex key={user.id} py={7} textAlign='center' alignItems="center" >
              <Avatar size={'md'} />
              <Box maxW={'xl'} fontSize={'lg'} p={3}>{user.name}</Box>
              <Spacer />
              <Button
                size="sm"
                colorScheme="teal"
                variant="solid"
                onClick={() => handleFriendRequest(user.id)}
              >
                { requestFriends.includes(user.id) ? '申請中' : '友達追加'}
              </Button>
            </Flex>
            <Divider />
          </>
        ))}
      </Box>
    </>
  )
}

export default Users