import React, { useState } from 'react'
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
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useHistory } from "react-router-dom"
import useLogin from 'hooks/useLogin';

const Login: React.VFC = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const {loginUser} = useLogin()
  const handleClick = () => setShow(!show)
  const goSignup = () => history.push('/signup')

  // ログイン処理
  const handleLoginUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    loginUser(email, password)
  }

  return (
    <Box mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>ログイン</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          まだアカウントをお持ちでない方は <Link onClick={goSignup} color={'blue.400'}>こちら</Link> 
        </Text>
      </Stack>
      <Box mx={'auto'} maxW={'lg'} py={12} px={6}>
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
                onClick={handleLoginUser}
                disabled={ !email || !password ? true : false}
                >
                ログイン
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Login
