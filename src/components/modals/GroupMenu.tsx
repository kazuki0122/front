import React from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  setBillingAmount: React.Dispatch<React.SetStateAction<string>>
  
}
const GroupMenu: React.VFC<Props> = (props) => {
  const {onClose, isOpen, time, setTime, setBillingAmount} = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>起床時間の設定</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box textAlign='center'>
          <input 
            value={time} 
            onChange={event =>setTime(event.target.value)} 
            type="time"
            style={{fontSize: '30px', width: '400px', textAlign: 'center'}}
          ></input>
          <InputGroup mt='5'>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="¥"
            />
            <Input onChange={event => setBillingAmount(event.target.value) } placeholder="金額を入力" />
          </InputGroup>
        </Box>
        {console.log(time)}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          閉じる
        </Button>
        <Button variant="ghost">完了</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default GroupMenu
