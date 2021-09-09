import React, {useState} from 'react'
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
  Heading,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignup from 'hooks/useSignup';

const Signup: React.VFC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPshoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [show, setShow] = useState(false)
  const {createUser} = useSignup()

  const handleClick = () => setShow(!show)

  // ユーザー登録
  const handleCreateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    createUser(name, email, phoneNumber, password, passwordConfirmation)
  }

  return (
    <Box mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>新規ユーザー登録</Heading>
      </Stack>
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
              <InputGroup>
              <InputLeftElement 
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input 
                placeholder="test@test.com" 
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              </InputGroup>
            </FormControl>
            <FormControl id="phone-number">
              <FormLabel>電話番号</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input 
                  placeholder="00000000000"
                  value={phoneNumber}
                  onChange={event => setPshoneNumber(event.target.value)}
                />
              </InputGroup>
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
              onClick={handleCreateUser}
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              >
              新規登録
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  </Box>
  );
}

export default Signup
