import {
    Avatar,
    Box,
    Heading,
    Image,
    Link,
    Text,
    Stack,
    Wrap,
    WrapItem,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
// import Link from 'next/link'
import { useQuery } from 'react-query';

const fetchBlogPosts = async () => {
    const res = await fetch ('http://localhost:1337/Articles')
    return res.json()
}

export default function Post() {
    const query = useQuery('fetchBlog', fetchBlogPosts, {
        initialData: []
    })

    const { data, status } = query

    return (
        <Wrap spacing="25px" p={4} shouldWrapChildren={false}>
            {data.map((post) => (
                <WrapItem>
                    <Box key={post.id}>
                        <Box
                            w={'350px'}
                            bg={useColorModeValue('white', 'gray.900')}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            p={6}
                            overflow={'hidden'}>
                            <Box
                            h={'210px'}
                            bg={'gray.100'}
                            mt={-6}
                            mx={-6}
                            mb={6}
                            pos={'relative'}>
                                <Image
                                    src={
                                    `http://localhost:1337${post.image.url}`
                                    }
                                    layout={'fill'}
                                    objectFit=''
                                />
                            </Box>
                            <Stack h={'150px'} p={2}>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'xx-small'}
                                    letterSpacing={1.1}>
                                    {post.category.name}
                                </Text>
                                <Heading
                                    color={useColorModeValue('gray.700', 'white')}
                                    fontSize={'xl'}
                                    fontFamily={'body'}>
                                    {post.title}
                                </Heading>
                                <Text color={'gray.500'} fontSize={'xs'}>
                                    {post.description}
                                </Text>
                                <Link href={`/articles/${post.slug}`} key={post.id}>
                                    <Text
                                        textTransform={'uppercase'}
                                        fontWeight={800}
                                        fontSize={'xx-small'}
                                        letterSpacing={1.1}>
                                        Read More
                                    </Text>
                                </Link>
                            </Stack>
                            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                <Avatar
                                    src={`http://localhost:1337${post.author.picture.url}`}
                                    alt={post.author.name}
                                />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600} fontSize='xs'>{post.author.name}</Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </WrapItem>
            ))}
        </Wrap>
    )
}
