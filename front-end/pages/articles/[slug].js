import {
    Center,
    Container,
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Input,
    Span,
    StackDivider,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { colourOptions } from './data';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

// //used server side rendering
// export const getStaticPaths = async () => {
//     const res = await fetch ('http://localhost:1337/articles')
//     const data = await res.json()

//     const paths = data.map(({slug}) => {
//         return {
//             params: { slug }
//         }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

// //useRouter

// export const getStaticProps = async (context) => {
//     const slug = context.params.slug
//     const res = await fetch('http://localhost:1337/articles/' + slug)
//     const data = await res.json()

//     console.log(data)

//     return {
//         props: {
//             article: data
//         }
//     }
// }


const fetchBlogPosts = async (key, e) => {
    const res = await fetch ('http://localhost:1338/articles/' + e)
    return res.json()
}

const postProjectContent = async (payload) => {
    const response = await fetch('http://localhost:1338/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

const fetchRelatedPosts = async (key, e) => {
    const res = await fetch ('http://localhost:1338/related-posts')
    return res.json()
}

const postTaggedContent = async (payload, key, e) => {
    const response = await fetch('http://localhost:1338/related-posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export default function Article({ article }) {
    const [ comment, setComment ] = useState()
    const [ author, setAuthor ] = useState()
    const [optionChange, setOptionChange] = useState([])
    const client = useQueryClient()
    const mutation = useMutation(postProjectContent)
    const mutateTag = useMutation(postTaggedContent)
    const router = useRouter()
    const { slug } = router.query
    const { test } = router.query

    const query = useQuery(['slug', slug], () => fetchBlogPosts('slug', slug), {
        enabled: !!slug,
      })

    const relatedQuery = useQuery(['posts'], fetchRelatedPosts)
    const { data: relatedPosts, refetch: fetchNewRelation } = relatedQuery

    let options = relatedPosts;

    const { data, status } = query

    const handleChange = (value) => {
        console.log(value)
        setOptionChange(value);
    }
    
    const handleCreate = (value) => {
        mutateTag.mutate({
            value: value,
            label: value,
        })
        fetchNewRelation;
    }

    useEffect(() => {
        if (mutation.isSuccess) {
            setComment('')
            setAuthor('')

            client.invalidateQueries('slug')
        }
    }, [mutation.isSuccess, client])

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(data?.id)
        // console.log(comment)


        mutation.mutate({
            article:{
                id: data?.id,
            } ,
            value: comment,
            label: author,
        })
    }

    const onSubmit2 = (e) => {
        console.log(e)
        // console.log(data?.id)
        // console.log(comment)

            // mutateTag.mutate({
            //     articles:{
            //         id: data?.id,
            //     } ,
            //     value: entry.value,
            //     label: entry.label,
            // }, )
    }


    return (
        <Box>
            {/* <header>
                <NavBar />  
            </header>
            <body>
                <VStack p={4} align='start'>
                    <Box display='flex' alignItems='center'>
                        <Image src={`http://localhost:1337${article.image.url}`}></Image>
                    </Box>
                    <Box>
                        <Heading as='h1' size='lg'>{article.title}</Heading>
                    </Box>
                    <Box>
                        <Container maxW='full' centerContent>
                            {article.content}
                        </Container>
                    </Box>
                    <Box>
                        <Heading as='h1' size='md'>Comments</Heading>
                        {article.comments.map((comment) =>(
                            <Container maxW='full' centerContent>
                                {comment}
                            </Container>
                        ))}
                    </Box>
                    <Box>
                        <Heading as='h1' size='md'>Leave a Reply</Heading>
                        <Container minW='full'>
                            <Textarea placeholder="Here is a sample placeholder" isFullWidth/>
                        </Container>
                    </Box>
                </VStack>
            </body>
            <footer>
                <Box>
                    <Footer />
                </Box>
            </footer> */}
            <header>
                <NavBar />  
            </header>
            <body>
                <Center>
                    <VStack 
                    p={2} 
                    align='start'
                    w='50%'
                    spacing='20px'>
                        <Text>Category: {data?.category.name}</Text>
                        <Box display='flex' alignItems='center'>
                            <Image src={`http://localhost:1338${data?.image.url}`}></Image>
                        </Box>
                        <Box>
                            <Heading as='h1' size='lg'>{data?.title}</Heading>
                        </Box>
                        <Box>
                            <Container maxW='full' centerContent>
                                {data?.content}
                            </Container>
                        </Box>
                        <form onSubmit={onSubmit2}>
                            <CreatableSelect
                                
                                isMulti
                                closeMenuOnSelect={false}
                                getNewOptionData={(inputValue, optionLabel) => ({
                                    label: optionLabel,
                                    value: inputValue,
                                    __isNew__: true,
                                })}
                                onChange={(e) => handleChange(e)}
                                onCreateOption={(e) => handleCreate(e)}
                                options={relatedPosts}
                                value={optionChange}
                            />
                            <Button type='submit'>Post Relation</Button>
                        </form>
                        <Box w='100%'>
                            <Heading as='h1' size='md'>Comments</Heading>
                            <VStack 
                            divider={<StackDivider borderColor="gray.200" />}
                            p={2}
                            spacing='10px'
                            align='start'
                            w='100%'>
                                {data?.comments.length > 0 
                                ? data?.comments.map((comment, index) => (
                                    <HStack key={comment.id} p={4}>
                                        <Box><Heading>{index + 1}</Heading></Box>
                                        <Box>
                                            <VStack p={4} align='start'>
                                                <Box><Heading size='md'>{comment.name}</Heading></Box>
                                                <Box>{comment.body }</Box>
                                            </VStack>
                                        </Box>
                                    </HStack>
                                    ))
                                : <Box>
                                    <Text color='gray.500'>
                                        Its lonely here
                                    </Text>
                                    </Box> }
                            </VStack>
                        </Box>
                        <Box width='100%'>
                            <form onSubmit={onSubmit}>
                                <fieldset>
                                    <VStack
                                    align='start'
                                    p={1}
                                    spacing='15px'>
                                        <Heading as='h1' size='md' htmlFor='comment'>Leave a Reply</Heading>
                                        <Input type='text' name='author' placeholder='Name' onChange={(e) => setAuthor(e.target.value)} value={author} w='50%'/>
                                        <Textarea type='text' name='comment' placeholder='Comment' onChange={(e) => setComment(e.target.value)} value={comment} isFullWidth/>
                                    </VStack>
                                    
                                </fieldset>
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Box>
                    </VStack>
                </Center>
            </body>
            <footer>
                <Box>
                    <Footer />
                </Box>
            </footer>
        </Box>
    )
}