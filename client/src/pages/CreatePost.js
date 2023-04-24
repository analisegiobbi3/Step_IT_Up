import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { BiDumbbell } from "react-icons/bi";

import { ADD_POST } from "../utils/mutations";
//remember to add QUERY_ME when that is made
import { QUERY_POSTS, QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

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

      const { user } = cache.readQuery({ query: QUERY_USER })
      cache.writeQuery({
        query: QUERY_USER,
        data: { user: { ...user, posts: [...user.posts, addPost]}}
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
      <h2>Time to Step up and Post!</h2>
      {Auth.loggedIn() ? (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <InputGroup>
                <InputLeftElement pointerEvents="none" icon={<BiDumbbell />} />
                <Input
                  placeholder="Post Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
            <div>
              <Textarea
                placeholder="Type Post Here!"
                name="text"
                value={text}
                onChange={handleChange}
              />
            </div>
            <div>
              <button>Post!</button>
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
