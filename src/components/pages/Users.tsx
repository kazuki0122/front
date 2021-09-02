import { Avatar, Box, Button, Divider, Flex, Heading, Spacer, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { AuthContext } from 'App';
import axios from 'axios';
import { User } from 'interfaces';
import React, {  useContext, useEffect } from 'react'
import { useState } from 'react';

const Users: React.VFC = () => {
  const { currentUser, loading } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [request, setRequest] = useState(false)
  const [resUsers, setResUsers] = useState([])
  
  const fetchUsers = () => {
    try{
      axios
       .get('http://localhost:3001/api/v1/users')
       .then((res) => {
         setResUsers(res.data.data)
        })
        .catch((err) => { 
          console.log(err);
        })
      } catch(error) {
        console.error('失敗です', error);
      } finally {
        const newUsers = resUsers.filter((user: User) => {
        console.log('userのid',user.id);
        console.log('currentUserのid',currentUser?.id);
        return  user.id !== currentUser?.id
        })
        console.log(newUsers);
        setUsers(newUsers)
    }
  } 
  
  useEffect(() => {
    fetchUsers()
  },[loading])

  const friendRequest = () => {
    setRequest(!request)
  }

  return (
    <>
      <Stack textAlign='center' mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>ユーザー一覧</Heading>
      </Stack>
      <Box textAlign='center' mx={'auto'} maxW={'xl'}>
        {users.map((user: User) => {
          return (
            <>
              <Flex key={user.id} py={7} textAlign='center' alignItems="center" >
                <Avatar size={'md'} />
                <Box maxW={'xl'}  fontSize={'lg'} p={3}>{user.name}</Box>
                <Spacer />
                <Button 
                  size="sm" 
                  colorScheme="teal" 
                  variant="solid" 
                  onClick={friendRequest}
                >
                  {request ? '友達申請' : '申請済み'}
                </Button>
              </Flex>
              <Divider />
            </>
          )
        })}
      </Box>
    </>
  )
}

export default Users
