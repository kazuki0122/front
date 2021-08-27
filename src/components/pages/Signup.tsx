import React, {useState, useContext} from 'react'
import { AuthContext } from 'App';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces';
import Cookies from "js-cookie"
import { useHistory } from 'react-router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useMessage from 'hooks/useMessage';

const Signup: React.VFC = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [show, setShow] = useState(false)

  const history =  useHistory()
  const {showMessage} = useMessage()

  const handleClick = () => setShow(!show)

  const createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")

        showMessage({title: 'ユーザー登録が完了しました', status: 'success'})
      } else {
        // setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      showMessage({title: 'ユーザー登録に失敗しました', status: 'error'})
    }
  }

  return (
    <Box spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'xl'}
        p={8}>
        <Stack spacing={6}>
          <FormControl id="nick-name">
            <FormLabel>名前</FormLabel>
            <Input 
              placeholder="テスト太郎"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>メールアドレス</FormLabel>
            <Input 
              placeholder="test@test.com" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <InputGroup>
              <Input 
                placeholder="******"
                value={password}
                onChange={event => setPassword(event.target.value)}
                type={show ? 'text' : 'password'}
              />
              <InputRightElement width='3rem'>
                {show ? 
                  <ViewOffIcon cursor="pointer" h='1.5rem' size='sm' onClick={handleClick} />
                  :
                  <ViewIcon cursor="pointer" h='1.5rem' size='sm' onClick={handleClick} /> 
                }
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード確認用</FormLabel>
              <Input 
                placeholder="******"
                value={passwordConfirmation}
                onChange={event => setPasswordConfirmation(event.target.value)}
                type={'password'}
              />
          </FormControl>
          <Stack>
            <Button
              bg={'orange.300'}
              color={'white'}
              _hover={{
                bg: 'orange.400',
              }}
              onClick={createUser}
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              >
              新規登録
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Signup
