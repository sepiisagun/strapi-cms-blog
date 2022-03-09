import {
    Box,
    Container,
    Center,
    HStack,
    Heading,
    Image,
    Link,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react'
import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:1338/categories')
    const data = await res.json()

    return {
        props: {
            articles: data
        }
    }
}

export default function Category({ category }) {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <body>
                <Center>
                    <VStack
                    align='start'
                    p={4}
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing='20px'
                    w='60%'
                    >
                        {category.map((post) => (
                            <HStack key={post.id} align='start'>
                                <Box>
                                    <Image maxW='250px' objectFit="cover" src={`http://localhost:1338${post.image.url}`}></Image>
                                </Box>
                                <Box>
                                    <VStack w='100%'>
                                        <Container>
                                            <Heading size='md'>
                                                {post.title}
                                            </Heading>
                                            <Text fontSize='x-small' color='green.400'>
                                                {post.category.name}
                                            </Text>
                                        </Container>
                                        <Container>
                                            <Text fontSize='xs'>
                                                {post.description}
                                            </Text>
                                            <Link href={`/articles/${post.slug}`} key={post.id}>
                                                <Text fontSize='xs' color='blue.400'>
                                                    Read More...
                                                </Text>
                                            </Link>
                                        </Container>
                                        <Container>
                                            <Text fontSize='sm' color='red.200'>
                                                By: {post.author.name}
                                            </Text>
                                        </Container>
                                    </VStack>
                                </Box>
                            </HStack>
                        ))}
                    </VStack>
                </Center>
            </body>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
