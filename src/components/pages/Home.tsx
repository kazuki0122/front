import React, {useContext} from 'react'
import { AuthContext } from 'App'
import { 
  Box,
  Image,
 } from '@chakra-ui/react'

const Home: React.VFC = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <Box>
        <Box mx={'auto'} maxW={'lg'} textAlign={['center']} >グループを作成しましょう！</Box>
        <Image 
          mx={'auto'}
          src={`${process.env.PUBLIC_URL}/macaroni-1522.png`} 
          alt="Logo" 
          boxSize="600px"
        />
      </Box>
    </>
  )
}

export default Home