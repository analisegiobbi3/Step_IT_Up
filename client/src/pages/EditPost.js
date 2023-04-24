import { useState } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_POST } from "../utils/mutations"
import {
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
  } from "@chakra-ui/react";

const EditPost = ({ post }) => {
    const [title, setTitle] = useState(post.title)
    const [text, setText] = useState(post.text)

    const [editPost] = useMutation(EDIT_POST)

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        await editPost ({
            variables: {
                id: post._id,
                title, 
                text
            }
        })

    }

    return (
        <div>
          <form onSubmit={handleSubmitForm}>
            <div>
              <InputGroup>
                <InputLeftElement/>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
              </InputGroup>
            </div>
            <div>
              <Textarea
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Save Changes!</button>
            </div>
          </form>
        </div>
    )
}

export default EditPost;