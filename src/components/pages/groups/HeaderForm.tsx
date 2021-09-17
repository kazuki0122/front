import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, Input } from '@chakra-ui/react'
import useCreateMessage from 'hooks/message/useCreateMessage'
import React, { useState } from 'react'
import { Message } from 'types/message'

type Props = {
  id: number
  allUsersMessages: Message[];
  setAllUsersMessages: React.Dispatch<React.SetStateAction<Message[]>> 
  onOpen: () => void;
}

const HeaderForm: React.VFC<Props> = (props) => {
  const {id, allUsersMessages, setAllUsersMessages, onOpen} = props
  const [message, setMessage] = useState('')
  const {createMessage } = useCreateMessage()

  const params = {
    message: {
      content: message,
      group_id: id
    }
  }

  // メッセージ作成
  const handleCreateMessage = () => {
    createMessage(id, params, allUsersMessages, setAllUsersMessages)
    setMessage('')
  }

  return (
    <>
      <Flex
        backgroundColor='gray.200'
        alignItems="center" 
        justify='center'
        pos='fixed' 
        bottom="0" 
        left='0' 
        right='0'
        height='120px'
        px={'5'}
      >
        <Button mr='8' backgroundColor='white' onClick={onOpen}> 
          <AddIcon  />
        </Button>
        <Flex
          alignItems="center" 
          minW={'95%'}
        >
          <FormControl id='message'>
            <Input 
              backgroundColor='white' 
              minH={14} 
              placeholder="メッセージを入力してください" 
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
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
            onClick={handleCreateMessage}
          >
            送信
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default HeaderForm
