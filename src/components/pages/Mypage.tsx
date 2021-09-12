import { EmailIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, Divider, Flex, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { friendApprove } from 'api/friend/fetchUser'
import { AuthContext } from 'App'
import useFetchFriendRequest from 'hooks/mypage/useFetchFriendRequest'
import useFetchFriends from 'hooks/mypage/useFetchFriends'
import { User } from 'interfaces'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'

const Mypage: React.VFC = () => {
  const { currentUser } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const {fetchRequestData, approval} = useFetchFriendRequest()
  const {fetchFriends, friends} = useFetchFriends()

  // 友達リクエストを取得
  useEffect(() => {
    fetchRequestData(setUsers)
  },[fetchRequestData])

  // 友達リクエストを承諾
  const handleApproval = (id: number) =>  {
    console.log(`承認したuserのidは${id}です`);
    friendApprove(id, Number(currentUser?.id))
    .then((res) => {
      console.log(res.data.data);
      fetchRequestData(setUsers)
      fetchFriends()
    })
  }

  // 友達になった人を取得
  useEffect(() => {
    fetchFriends()
  },[fetchFriends])

  return (
      <>
        <Flex>
          <Box py={12} px={6} minWidth={'xl'}>
            <Flex justify="center">
              <Avatar size={'2xl'}></Avatar>
            </Flex>
            <Stack mt={3}>
              <Text fontSize={'xl'} textAlign="center">{currentUser?.name}</Text>
            </Stack>
            <Stack mt={3}>
              <Text fontSize={'xl'} textAlign="center">
                <EmailIcon mr={4} color='teal.300'/>
                {currentUser?.email}
              </Text>
            </Stack>
          </Box>
          <Center height='100%'>
            <Divider orientation="vertical"  height='900px' />
          </Center>
          <Tabs isFitted variant="enclosed" minWidth={'4xl'}>
            <TabList mb="1em">
              <Tab>友達リスト</Tab>
              <Tab>友達リクエスト</Tab>
              <Tab>所属グループ</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {friends.map((friend: User) => (
                   <>
                   <Flex key={friend.id} py={7} textAlign='center' alignItems="center" >
                     <Avatar size={'md'} />
                     <Box maxW={'xl'} fontSize={'lg'} p={3}>{friend.name}</Box>
                     <Spacer />
                   </Flex>
                   <Divider />
                 </>
                ))}
              </TabPanel>
              <TabPanel>
                {users.map((user: User) => {
                  return(
                    <>
                      <Box mx={'auto'} maxW={'md'} pt={12} pb={4} textAlign="center" boxShadow={'xl'} mt={8}>
                        <Text fontSize={'lg'} color={'gray.600'} >{user.name}さんから友達リクエストがあります。</Text>
                        <Button
                          bg={'orange.300'}
                          _hover={{
                            bg: 'orange.400',
                          }}
                          mt={3}
                          onClick={() => handleApproval(user.id)}>
                            承諾
                        </Button>
                      </Box>
                    </>
                  )
                })}
              </TabPanel>
              <TabPanel>
                <h2>グループ一覧</h2>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </>
  )
}

export default Mypage
