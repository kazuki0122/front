import React from 'react'
import {
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import HamburgerMenu from './HamburgerMenu';

const Header: React.VFC = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()

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
       <HamburgerIcon cursor="pointer" w={8} h={8} size='md' onClick={onOpen} />
        <HamburgerMenu 
          isOpen={isOpen} 
          onClose={onClose}
        />
      </Flex>
    </Flex>
  )
}

export default Header
