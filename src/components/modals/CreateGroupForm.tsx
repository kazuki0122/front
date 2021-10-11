import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Input,
} from "@chakra-ui/react"
import Select from 'react-select';
import { AuthContext } from 'App'
import { User } from 'interfaces'
import useFetchFriends from 'hooks/group/useFetchFriends';
import useCreatGroup from 'hooks/group/useCreatGroup';

type Props = {
  onCloseModal: () => void;
  isOpenModal: boolean;
}

const CreateGroupForm: React.VFC<Props> = (props) => {
  const {onCloseModal, isOpenModal} = props
  const { currentUser } = useContext(AuthContext)
  const [sendUsers, setSendUsers] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');
  const {fetchFriends, friends} = useFetchFriends()
  const {createGroup} = useCreatGroup()

  // 友達を取得
  useEffect(() => fetchFriends(), [fetchFriends])

  // グループ名を取得
  const inputGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value)
    console.log(groupName);
  }
    
  // 友達情報を取得
  const handleChange = (value: any): void => {
    console.log(value);
    const uids = value.map((user: User) => user.id)
    // uids.push(currentUser?.id)
    console.log(uids);
    setSendUsers(uids);
  }
  // 送るデータをまとめる
  const params = {
    group: {
      name: groupName,
      user_ids: sendUsers,
    }
  }

  // const params = {
  //   group_request: {
  //     name: groupName,
  //     to_ids: sendUsers
  //   }
  // }

  // グループリクエストを作成
  const handleCreatGroup = () => {
    createGroup(params)
  }
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>グループ名</Text>
            <Input 
              placeholder='グループ名を入力してください' 
              onChange={inputGroupName}
            />
            <Text>友達を選択</Text>
            <Select
              isMulti
              name="colors"
              onChange={handleChange}
              options={friends}
              placeholder='友達を選択してください'
              getOptionValue={option => option["id"]}
              getOptionLabel={option => option["name"]}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            </Stack>
        </ModalBody>
        <ModalFooter> 
          <Button colorScheme="orange" onClick={() => {handleCreatGroup(); onCloseModal();}}> 作成 </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateGroupForm
