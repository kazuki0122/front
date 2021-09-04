import { Avatar, Box, Button, Divider, Flex, Heading, Spacer, Stack, Text, useColorModeValue, ButtonProps, Select } from '@chakra-ui/react';
import { AuthContext } from 'App';
import axios from 'axios';
import { User } from 'interfaces';
import React, {  useContext, useEffect } from 'react'
import { useState } from 'react';
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator
} from "chakra-paginator";

const Users: React.VFC = () => {
  const { currentUser, loading } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [request, setRequest] = useState(false)
  const [resUsers, setResUsers] = useState([])
  const [pagesQuantity, setPagesQuantity] = useState(0);
  
  const fetchUsers = (pageSize: number, offset: number) => {
    try{
      axios
       .get(`http://localhost:3001/api/v1/users?limit=${pageSize}&offset=${offset}`)
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
  
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm"
  };
  
  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "green.300"
    },
    bg: "red.300"
  };
  
  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "blue.300"
    },
    bg: "green.300"
  };
  
  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200"
  };
  const friendRequest = () => {
    setRequest(!request)
  }
  
  // pageネーションの数を表す
  const { 
    currentPage,
    setCurrentPage,
    pageSize,
    offset 
  } = usePaginator({
    total: users.length,
    initialState: { 
      pageSize: 5,
      currentPage: 1,
      isDisabled: false
    }
  });
  
  useEffect(() => {
    fetchUsers(pageSize)
  },[loading, currentPage, pageSize, offset])

  // 次のページへ遷移
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  useEffect(() => {
    const pagesTotal = Math.ceil(users.length);
    setPagesQuantity(pagesTotal);
  },[users.length])

  return (
    <>
      <Stack textAlign='center' mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>ユーザー一覧</Heading>
      </Stack>
      <Paginator
        activeStyles={activeStyles}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        // ページネーションの間に...をつける
        outerLimit={2}
        innerLimit={2}
      >
        <Container mx={'auto'} maxW={'xl'}  justify="space-between" p={4}>
          <Previous>
            前へ
          </Previous>
          <PageGroup isInline align="center" />
          <Next>
            次へ
          </Next>
        </Container>
      </Paginator>
      <Box textAlign='center' mx={'auto'} maxW={'xl'}>
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
                onClick={friendRequest}
              >
                {request ? '友達申請' : '申請済み'}
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
