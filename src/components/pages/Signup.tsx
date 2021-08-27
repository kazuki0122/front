import React, {useState, useContext} from 'react'
import { AuthContext } from 'App';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces';
import Cookies from "js-cookie"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  InputRightElement
} from '@chakra-ui/react';
import { useHistory } from 'react-router';

const Signup: React.VFC = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  // const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const history =  useHistory()

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

        console.log("Signed in successfully!")
      } else {
        // setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      // setAlertMessageOpen(true)
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
              placeholder="名前"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>メールアドレス</FormLabel>
            <Input 
              placeholder="メールアドレス" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
              <Input 
                placeholder="パスワード" 
                value={password}
                onChange={event => setPassword(event.target.value)}
                type={show ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード確認用</FormLabel>
              <Input 
                placeholder="パスワード確認用" 
                value={passwordConfirmation}
                onChange={event => setPasswordConfirmation(event.target.value)}
                type={show ? 'text' : 'password'}
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
