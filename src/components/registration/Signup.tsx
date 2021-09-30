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
import { AtSignIcon, EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignup from 'hooks/registration/useSignup';
import useRegisterCard from 'hooks/card/useRegisterCard';
import {useStripe} from '@stripe/react-stripe-js';
import CardSection from './CardSection';

const Signup: React.VFC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPshoneNumber] = useState("")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [show, setShow] = useState(false)
  const {createUser} = useSignup()
  const {registerCard} = useRegisterCard()
  const stripe = useStripe();

  const handleClick = () => setShow(!show)

  // ユーザー登録
  const handleCreateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await createUser(name, email, phoneNumber, password, passwordConfirmation, userId)
    await registerCard(name, email)
  }

  return (
    <Box mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>ユーザー登録</Heading>
      </Stack>
      <Box spacing={8} mx={'auto'} maxW={'lg'} py={4} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={8}>
          <Stack spacing={6}>
            <FormControl id="name" isRequired>
              <FormLabel>名前</FormLabel>
              <Input 
                placeholder="テスト太郎"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
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
            <FormControl id="user-id" isRequired>
              <FormLabel>ユーザーID</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input 
                  placeholder="6文字以上・半角英数字"
                  value={userId}
                  onChange={event => setUserId(event.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="phone-number" isRequired>
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
            <FormControl id="password" isRequired>
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
            <FormControl id="password" isRequired>
              <FormLabel>パスワードの確認</FormLabel>
                <Input 
                  placeholder="******"
                  value={passwordConfirmation}
                  onChange={event => setPasswordConfirmation(event.target.value)}
                  type={'password'}
                />
            </FormControl>
            <CardSection />
          <Stack>
            <Button
              bg={'orange.300'}
              color={'white'}
              _hover={{
                bg: 'orange.400',
              }}
              onClick={handleCreateUser}
              disabled={!name || !email || !password || !passwordConfirmation || !stripe ? true : false}
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
