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
import axios from 'axios'
import { AuthContext } from 'App'
import { User } from 'interfaces'
import { useHistory } from 'react-router-dom'
import useMessage from 'hooks/useMessage';

type Props = {
  onCloseModal: () => void;
  isOpenModal: boolean;
}

const GroupForm: React.VFC<Props> = (props) => {
  const {onCloseModal, isOpenModal} = props
  const { currentUser } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [sendUsers, setSendUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const history = useHistory();
  const { showMessage } = useMessage()

  // 全てのユーザーデーターを取得
  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/api/v1/users')
      .then((res) => {
        const users = res.data.data
        const newUsers = users.filter((user: User) =>  user.id !== currentUser?.id)
        setUsers(newUsers)
      })
      .catch((err) => { 
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers()
  },[setUsers])

  const handleChange = (value: any): void => {
    console.log(value);
    const uids = value.map((user: User) => user.id)
    uids.push(currentUser?.id)
    console.log(uids);
    setSendUsers(uids);
  }

  const inputGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value)
    console.log(groupName);
  }
  const params = {
    group: {
      name: groupName,
      user_ids: sendUsers
    }
  }

  const creatGroup = () => {
    axios
      .post('http://localhost:3001/api/v1/groups', params)
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
          console.log(res.data.data.id)
          history.push(`/group/${res.data.data.id}`)
        } else {
          console.log(res);
          showMessage({title: `${res.data.data.name}というグループは既に存在します`, status: 'error'})
        }
      })
      .catch((err) => { 
      console.log(err);
    });
  }

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {console.log('users',users)}
          <Stack>
            <Text>グループ名</Text>
            <Input 
              placeholder='グループ名を入力してください' 
              onChange={inputGroupName}
            />
            <Text>ユーザー名</Text>
            <Select
              isMulti
              name="colors"
              onChange={handleChange}
              options={users}
              placeholder='ユーザーを選択してください'
              getOptionValue={option => option["id"]}
              getOptionLabel={option => option["name"]}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            </Stack>
        </ModalBody>
        <ModalFooter> 
          <Button colorScheme="orange" onClick={() => {creatGroup(); onCloseModal();}}> 作成 </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GroupForm
