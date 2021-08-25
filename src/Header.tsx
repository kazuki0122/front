import React from 'react'
import { Box, Button, Flex, Heading, Spacer, Stack } from "@chakra-ui/react"
import { useHistory } from "react-router";

const Header: React.VFC = () => {
  const history = useHistory();
  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');
  return (
    <Flex
      bg="orange.300"
      color="white"
      p={7}
    >
      <Flex align="center" mr={5}>
        <Heading 
          as="h1" 
          size="lg" 
          letterSpacing={"tighter"}
        >
          Early Bird
        </Heading>
      </Flex>
      <Spacer />
      <Flex>
        <Button 
          bg="orange.300" 
          color="white" 
          variant="outline" 
          mr={4} 
          _hover={{bg: 'orange.400'}}
          onClick={onClickLogin}
          >
          ログイン
        </Button>
        <Button 
          bg="orange.300" 
          color="white" 
          variant="outline"
          _hover={{bg: 'orange.400'}}
          onClick={onClickSignUp}
        >
          新規登録
        </Button>
      </Flex>
    </Flex>
  )
}

export default Header
