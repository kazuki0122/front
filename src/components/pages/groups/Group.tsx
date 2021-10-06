import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom"
import useFetchGroup from 'hooks/group/useFetchGroup';
import { Avatar, Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import classes from 'style.module.css'
import { AuthContext } from 'App';
import useFetchMessages from 'hooks/message/useFetchMessages';
import { Message } from 'types/message';
import FooterForm from './FooterForm';
import GroupMenu from 'components/modals/GroupMenu';

const Group = () => {
  const { id } = useParams()
  const { currentUser } = useContext(AuthContext)
  const [allUsersMessages, setAllUsersMessages] = useState<Message[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [time, setTime] = useState('')
  const [ billingAmount, setBillingAmount] = useState('')
  const {fetchMessages } = useFetchMessages()
  const {fetchGroup} = useFetchGroup()

  // グループ情報を取得
  useEffect(() => fetchGroup(id) ,[fetchGroup, id])

  // メッセージ取得
  useEffect(() => {fetchMessages(id, setAllUsersMessages)},[id, fetchMessages, setAllUsersMessages])

  
  return (
    <Box pos='relative' pb='120px' >
      {allUsersMessages.map((message: Message) => (
        message.userId === currentUser?.id
        ?
        <>
        <Flex
          className={classes.balloon_r}
          alignItems='flex-start'
          margin='30px 0'
          justifyContent='flex-end'
          key={message.id}
          >
          <Flex flexFlow='column' justify="center" mr={'40px'} ml={'25px'} order={2}>
            <Avatar  />
            <Box textAlign='center'>{currentUser?.name}</Box>
          </Flex>
          <Flex
          className={classes.says}
          maxW={'400px'}
          position='relative'
          overflowWrap='break-word'
          wordBreak='break-all'
          padding='17px 18px 15px 18px'
          borderRadius='12px'
          backgroundColor='#99dddd'
          boxSizing='border-box'
          margin='0'
          lineHeight='1.5'
          >
            <Flex flexFlow='column' justify="center">
              <Box>{message.content}</Box>
              <Text textAlign="right" fontSize='5px'>{message.createdAt}</Text>
            </Flex>
          </Flex>
        </Flex>
        </>
        :
        <>
        <Flex
          className={classes.balloon_l}
          justifyContent={'flex-start' }
          margin='30px 0'
          alignItems='flex-start'
          key={message.id}
          >
          <Flex flexFlow='column' justify="center" mr={'25px'} ml={'40px'}>
            <Avatar />
            <Box textAlign='center'>
            {message.userName}
            </Box>
          </Flex>
          <Flex
            className={classes.says}
            maxW={'400px'}
            position='relative'
            overflowWrap='break-word'
            wordBreak='break-all'
            padding='17px 18px 15px 18px'
            borderRadius='12px'
            backgroundColor='#99dddd'
            boxSizing='border-box'
            margin='0'
            lineHeight='1.5'
            >
            <Flex flexFlow='column' justify="center">
              <Box>{message.content}</Box>
              <Text textAlign="right" fontSize='5px'>{message.createdAt}</Text>
            </Flex>
          </Flex>
        </Flex>
        </>
       ))} 
      <GroupMenu id={id} billingAmount={billingAmount} setBillingAmount={setBillingAmount} time={time} setTime={setTime} isOpen={isOpen} onClose={onClose} />
      <FooterForm onOpen={onOpen} id={id} allUsersMessages={allUsersMessages} setAllUsersMessages={setAllUsersMessages} />
    </Box>
  )
}

export default Group