import {
  Box,
} from '@chakra-ui/react'
import React, { useState }from 'react'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Post from './Components/Post'

export default function Home() {
  return (
    <Box>
      <header>
        <NavBar />  
      </header>
      <body>
        <Box minHeight='xl'>
          <Post />
        </Box>
      </body>
      <footer>
        <Box>
          <Footer />
        </Box>
      </footer>
    </Box>
    
  )
}
