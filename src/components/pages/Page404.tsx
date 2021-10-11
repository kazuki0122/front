import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { useHistory } from 'react-router'


const Page404 = () => {
  const history = useHistory()
  const handleClick = () => history.push('/')
  return (
    <>
      <Image my={5} mx={'auto'} boxSize="300px" src={`${process.env.PUBLIC_URL}/surr-error-1.png`} alt="404" />
      <Box
        mx={'auto'} 
        maxW={'lg'}  
        textAlign="center"
      >
        <Text fontSize="xl" >お探しのページは見つかりませんでした。</Text>
        <Button 
          mt={6} 
          color={'white'}
          bg={'red.400'} 
          onClick={handleClick}
          _hover={{
            bg: 'red.500',
          }}
        >
          トップページに戻る
        </Button>
      </Box>
    </>
  )
}

export default Page404
