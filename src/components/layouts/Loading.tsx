import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from 'App';
import LoadingOverlay from 'react-loading-overlay';
import { Box,Button } from '@chakra-ui/react';
const Loading = () => {
  const { loading, setLoading } = useContext(AuthContext)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  },[setLoading])

  const click = () =>{ 
    setCount(count + 1)
    console.log(count);
  }

  return (
      <LoadingOverlay
        active={loading}
        spinner
        text='Loading your content...'
      >
        {count}
        <Button onClick={() => click()}></Button>
      <Box w="100%" h='900px'>Some content or children or something.</Box>
    </LoadingOverlay>
  )
}

export default Loading
