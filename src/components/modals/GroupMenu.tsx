import React from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import useCreateRules from 'hooks/group/useCreateRules';
import { useState } from 'react';

type Props = {
  id: number
  onClose: () => void;
  isOpen: boolean;
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  billingAmount: string
  setBillingAmount: React.Dispatch<React.SetStateAction<string>>
}

const GroupMenu: React.VFC<Props> = (props) => {
  const {id, onClose, isOpen, time, setTime , setBillingAmount} = props
  const [wakeUpTime, setWakeUpTime] = useState('')
  const [amount, setAmount] = useState('')
  const {createRules} = useCreateRules()

  const params = {
    rule: {
      group_id: id,
      wakeup_time: wakeUpTime,
      charge: amount
    }
  }
  // ルールの作成
  const handleSubmit = () => {
    createRules(params,setTime,setBillingAmount)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>起床時間の設定</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box textAlign='center'>
          <input 
            type="datetime-local"
            value={wakeUpTime}
            onChange={event => setWakeUpTime(event.target.value)}
            style={{fontSize: '30px', width: '400px', textAlign: 'center'}}
            ></input>
          <InputGroup mt='5'>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="¥"
            />
            <Input onChange={event => setAmount(event.target.value)} placeholder="罰金は100円~1000円まで" />
          </InputGroup>
        </Box>
        {console.log(time)}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => {onClose(); handleSubmit();}}>
          閉じる
        </Button>
        <Button variant="ghost" onClick={() => {onClose(); handleSubmit();}}>完了</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default GroupMenu
