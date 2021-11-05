import {
    Box,
    HStack,
    Link,
} from '@chakra-ui/react'
import React from 'react'

export default function NavBar({ changeContent }){
    return(
        <Box width='100%'>
            <Box borderWidth='1px' width='100%' p={4}>
                <HStack align='center' spacing={8}>
                    <Link href='/'>Home</Link>
                    <Link href='/articles/'>Articles</Link>
                    <Link href='/categories/'>Categories</Link>
                </HStack>
            </Box>
        </Box>
    )
}