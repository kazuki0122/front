import { Button, Flex, FormControl, Input } from '@chakra-ui/react'
import useCreateMessage from 'hooks/message/useCreateMessage'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Message } from 'types/message'

type Props = {
  id: number
  allUsersMessages: Message[];
  setAllUsersMessages: React.Dispatch<React.SetStateAction<Message[]>> 
  onOpen: () => void;
}

const FooterForm: React.VFC<Props> = (props) => {
  const {id, allUsersMessages, setAllUsersMessages, onOpen} = props
  const [message, setMessage] = useState('')
  const {createMessage } = useCreateMessage()
  const history = useHistory();

  const params = {
    message: {
      content: message,
      group_id: id
    }
  }

  // メッセージ作成
  const handleCreateMessage = async() => {
    await createMessage(id, params, allUsersMessages, setAllUsersMessages)
    setMessage('')
  }
  
  const moveDetail = () =>  {
    history.push(`/group/${id}/detail` )
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
        <Button 
          mr='8' 
          backgroundColor='#63B3ED'
          color={'white'}
          _hover={{
              bg: '#4299E1',
          }}
          onClick={onOpen}
        > 
          時間設定
        </Button>
        <Button 
          mr='8' 
          backgroundColor='#63B3ED'
          color={'white'}
          _hover={{
              bg: '#4299E1',
          }}
          onClick={moveDetail}
        > 
          設定時間の確認
        </Button>
        <Flex
          alignItems="center" 
          minW={'80%'}
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

export default FooterForm
