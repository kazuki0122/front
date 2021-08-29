import React, {useContext, useState} from 'react'
import {
  Button,
  Flex,
  Heading,
  Spacer,
  Drawer,
  DrawerBody,
  Divider,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  Select,
} from "@chakra-ui/react"
import { HamburgerIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useHistory } from "react-router";
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth"
import { AuthContext } from 'App';

const Header: React.VFC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const history = useHistory();
  
  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');
  // Drawer用
  const { isOpen, onOpen, onClose} = useDisclosure()
  // Modal用
  const { 
    isOpen: isOpenReportModal, 
    onOpen: onOpenReportModal, 
    onClose: onCloseReportModal 
  } = useDisclosure()

  const handleSignOut = async () => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }
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
       <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        >
        <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>メニュー</DrawerHeader>
            <DrawerBody>
              { isSignedIn
                ?
                <>
                <Stack spacing={4} cursor="pointer" position="relative">
                  <Divider />
                  <Flex justify={'center'}>
                    <Box onClick={handleSignOut}>
                      ログアウト
                    </Box>
                    <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                  </Flex>
                  <Divider />
                    <Flex justify={'center'}>
                      <Box onClick={ onOpenReportModal }>
                        グループ作成
                      <Modal isOpen={isOpenReportModal} onClose={onCloseReportModal}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader></ModalHeader>
                          <ModalCloseButton />
                          <ModalBody> 
                            <Stack>
                              <Text>グループ名</Text>
                              <Input />
                              <Select placeholder="ユーザー一覧">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </Select>
                              </Stack>
                          </ModalBody>
                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onCloseReportModal}>
                              閉じる
                            </Button>
                            <Button colorScheme="orange"> 作成 </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      </Box>
                      <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                    </Flex>
                  <Divider />
                    <Flex justify={'center'}>
                      <Box>
                        マイページ
                      </Box>
                      <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                    </Flex>
                  <Divider />
                  </Stack>
                </>
                :
                <>
                  <Stack spacing={4} cursor="pointer" position="relative">
                    <Divider />
                      <Flex justify={'center'}>
                        <Box onClick={onClickLogin}>
                          ログイン
                        </Box>
                        <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                      </Flex>
                    <Divider  />
                      <Flex justify={'center'}>
                        <Box onClick={onClickSignUp} >
                          新規登録
                        </Box>
                        <ChevronRightIcon w={6} h={6} position="absolute" right='0' />
                      </Flex>
                    <Divider />
                  </Stack>
                </>
              }
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  )
}

export default Header
