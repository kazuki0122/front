import React, { useContext, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthContext } from 'App';
import { SignInParams } from 'interfaces';
import { signIn } from 'lib/api/auth';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom"

const Login: React.VFC = () => {
  const [show, setShow] = useState(false)
  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleClick = () => setShow(!show)

  const loginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
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
                type={show ? 'text' : 'password'}
                onChange={event => setPassword(event.target.value)}
              />
              <InputRightElement width='3rem'>
                {show ?
                  <ViewOffIcon cursor="pointer" h='1.5rem' size='sm' onClick={handleClick}  />
                  :
                  <ViewIcon cursor="pointer" h='1.5rem' size='sm' onClick={handleClick} />
                }
              </InputRightElement>
            </InputGroup>
            </FormControl>
          <Stack>
            <Button
              bg={'orange.300'}
              color={'white'}
              _hover={{
                bg: 'orange.400',
              }}
              onClick={loginUser}
              disabled={ !email || !password ? true : false}
              >
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login
