import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  Center,
} from "@chakra-ui/react";
import { BiDumbbell } from "react-icons/bi";
import { StarIcon } from '@chakra-ui/icons'

import { ADD_POST } from "../utils/mutations";
//remember to add QUERY_ME when that is made
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import '../styles/CreatePost.css'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (error) {
        console.error(error);
      }

      const { me } = cache.readQuery({ query: QUERY_ME })
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost]}}
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          title,
          text,
          author: Auth.getProfile().data.username,
        },
      });
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    }

    if (name === "text") {
      setText(value);
    }
  };

  return (
    <div>
      <h1>Time to Step up and Post!</h1>
      {Auth.loggedIn() ? (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <InputGroup size='md'>
                <InputLeftElement pointerEvents="none" icon={<BiDumbbell />}/>
                <Input
                  placeholder="Post Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  mr={10}
                  ml={10}

                />
              </InputGroup>
            </div>
            <div>
              <InputGroup>
                <Textarea
                    placeholder="Type Post Here!"
                    name="text"
                    value={text}
                    onChange={handleChange}
                    mt={5}
                    mr={10}
                    ml={10}
                  />
              </InputGroup> 
            </div>
            <div>
              <Center>
                <Button type='submit' colorScheme='purple' variant='outline' size='lg' mb={5} mt={5} ml={10} icon={<StarIcon />}>
                    Post!
                </Button>
              </Center>
            </div>
          </form>
        </div>
      ) : (
        <p>You need to be logged in to post!</p>
      )}
    </div>
  );
};
export default CreatePost;
