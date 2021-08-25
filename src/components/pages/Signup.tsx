import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Signup: React.VFC = () => {
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
            <Input placeholder="メールアドレス" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
              <Input placeholder="パスワード" />
            </FormControl>
          <FormControl id="nick-name">
            <FormLabel>ニックネーム</FormLabel>
            <Input placeholder="ニックネーム" />
          </FormControl>
          <Stack>
            <Button
              bg={'orange.300'}
              color={'white'}
              _hover={{
                bg: 'orange.400',
              }}>
              新規登録
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Signup
