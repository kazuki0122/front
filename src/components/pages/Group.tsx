import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import useFetchGroup from 'hooks/group/useFetchGroup';
import { User } from 'interfaces';
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

const Group = () => {
  const { id } = useParams()
  const {fetchGroup, participants} = useFetchGroup()

  useEffect(() => {
    fetchGroup(id)
  },[fetchGroup, id])

  return (
    <Box pos='relative'>
      <h1>グループidは{id}</h1>
      {participants.map((participant: User) => (
        <>
          <h2>{participant.name}</h2>
        </>
      ))}
      <Flex
        backgroundColor='gray.200'
        alignItems="center" 
        justify='center'
        pos='fixed' 
        bottom="0" 
        left='0' 
        right='0'
        height='120px'
      >
        <Flex
          alignItems="center" 
          minW={'98%'}
        >
          <FormControl id='message'>
            <Input backgroundColor='white' minH={14} placeholder="メッセージを入力してください" />
          </FormControl>
          <Button 
            ml="2"
            w='20'
            size="lg"
            bg={'orange.400'}
            color={'white'}
            _hover={{
              bg: 'orange.500',
            }}
          >送信</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Group
