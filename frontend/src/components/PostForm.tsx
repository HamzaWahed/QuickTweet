import ***REMOVED*** FormEvent ***REMOVED*** from "react";
import ***REMOVED*** Button, Form, Modal ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** createPost ***REMOVED*** from "../api/postApi";
import ***REMOVED*** PostFormProps ***REMOVED*** from "../types";

/**
 * `PostForm` is a React component that renders a modal form for creating a new post.
 *
 * The component encapsulates a modal dialog that prompts the user to enter the content for a new post. Upon submission,
 * it leverages the `createPost` function to send the post data to the server. The modal's visibility is controlled by
 * the `modal` state, which can be toggled on or off. The `setLoading` function is called to indicate that the post creation
 * process has started, providing feedback to the user.
 *
 * @component
 * @returns The `PostForm` component renders a modal with a form for creating a new post.
 */
const PostForm = (***REMOVED*** modal, setModal, user, setLoading ***REMOVED***: PostFormProps) => ***REMOVED***
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => ***REMOVED***
    e.preventDefault();
    await createPost(user, e.currentTarget.content.value);
    setModal(false);
    setLoading(true);
  ***REMOVED***;

  return (
    <Modal
      show=***REMOVED***modal***REMOVED***
      onHide=***REMOVED***() => ***REMOVED***
        setModal(false);
  ***REMOVED******REMOVED***
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a new post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit=***REMOVED***onSubmit***REMOVED***>
          <Form.Group className='mb-3' controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control as='textarea' style=***REMOVED******REMOVED*** height: "150px" ***REMOVED******REMOVED*** autoFocus />
          </Form.Group>
          <Button variant='secondary' className='me-3' onClick=***REMOVED***() => setModal(false)***REMOVED***>
            Close
          </Button>
          <Button variant='primary' type='submit'>
            Create Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
***REMOVED***;

export default PostForm;
