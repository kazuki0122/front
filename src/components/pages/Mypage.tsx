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
  const [friendRequest, setFriendRequest] = useState([])
  const {fetchRequestData } = useFetchFriendRequest()
  const {fetchFriends, friends} = useFetchFriends()

  // 友達リクエストを取得
  useEffect(() => {
    fetchRequestData(setFriendRequest)
  },[fetchRequestData])

  // 友達リクエストを承諾
  const handleApproval = (id: number) =>  {
    console.log(`承認したuserのidは${id}です`);
    friendApprove(id, Number(currentUser?.id))
    .then((res) => {
      console.log(res.data.data);
      fetchRequestData(setFriendRequest)
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
                @{currentUser?.userId}
              </Text>
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
                {
                  friends.length ?
                    friends.map((friend: User) => (
                      <>
                        <Flex key={friend.id} py={7} textAlign='center' alignItems="center" >
                          <Avatar size={'md'} />
                          <Box maxW={'xl'} fontSize={'lg'} p={3}>{friend.name}</Box>
                          <Spacer />
                        </Flex>
                        <Divider />
                      </>
                    ))
                  :
                    <Box  mx={'auto'} maxW={'lg'} textAlign={'center'}>友達はまだいません</Box>
                }
              </TabPanel>
              <TabPanel>
                {
                  friendRequest.length ?
                    friendRequest.map((user: User) => {
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
                    })
                  :
                    <Box mx={'auto'} maxW={'lg'} textAlign={'center'}>友達リクエストはありません</Box>
                }
              </TabPanel>
              <TabPanel>
                <Box mx={'auto'} maxW={'lg'} textAlign={'center'}>所属してるグループはまだありません</Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </>
  )
}

export default Mypage
