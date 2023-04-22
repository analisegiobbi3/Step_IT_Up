import React, { useState }from 'react';
import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Text, CardHeader, Heading } from '@chakra-ui/react'
import { FiThumbsUp } from "react-icons/fi";


const AllPosts = ({
    posts

}) => {

    const [count, setCount] = useState(0);
    const handleLike = () => {
        setCount(count + 1)
    }

    if (!posts.length){
        return <h1>No One Has Stepped Up and Posted Yet! Be the First!</h1>
    }


    return(
        <div>
            {posts && posts.map((post) => {
                <Card key={post._id}>
                    <CardHeader>
                        <Link to={`/posts/${post._id}`}>
                            <Heading>{post.title}</Heading>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.text}</Text>
                    </CardBody>
                    <CardFooter>
                        <div>
                            By: {post.author} on {post.createdAt}
                        </div>
                        <div>
                            <button onClick={handleLike} icon={<FiThumbsUp />}></button>
                            <p>{count}</p>
                        </div>
                    </CardFooter>
                </Card>

            })}

        </div>
    )
}

export default AllPosts;
