import axios from 'axios'
import {
  Box, Button
} from '@chakra-ui/react'
import React, { useState }from 'react'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Post from './Components/Post'

export default function Home() {
  const testGet = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'AcLsUi494UEefmnxGJ1K9bNnkIhZe4YVi_BSF3o7hDlS1BVvC9bdkDTchEedP9rU_W7G3qQgxvm22GHx',
        password: 'EDediHnsS37_3mFamEtuNEQdV1KyAMM96mBwPcn_M3vC2mI48apeHximwUk0jwtCQACHanj8ZOOf1HaO'
      }
    }
    axios.get('https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-D3E61WBM5RKP', config).then(res => console.log(res.data)).catch(err => console.log(err))
  }
  return (
    <Box>
      <header>
        <Box zIndex={1000} position={'fixed'}>
          <NavBar /> 
        </Box>
      </header>
      <body>
        <Box minHeight='xl' zIndex={-1}>
          <Post />
        </Box>
        <Button onClick={testGet}>Test</Button>
      </body>
      <footer>
        <Box>
          <Footer />
        </Box>
      </footer>
    </Box>
    
  )
}
