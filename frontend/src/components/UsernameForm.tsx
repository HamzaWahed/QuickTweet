import ***REMOVED*** faCircleLeft ***REMOVED*** from "@fortawesome/free-regular-svg-icons/faCircleLeft";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** Button, Col, Form, Row ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** getSecurityQuestion ***REMOVED*** from "../api/userApi";
import ***REMOVED*** FormEvent ***REMOVED*** from "react";
import ***REMOVED*** UsernameFormProps ***REMOVED*** from "../types";

/**
 * Renders a form for users to input their username when they have forgotten their password.
 * Upon submission, it attempts to fetch the security question associated with the username.
 * If successful, it updates the parent component's state with the username and security question.
 * In case of an error, it displays an error message and allows the user to try again.
 *
 * @component
 * @param ***REMOVED***Object***REMOVED*** props - The component props.
 * @param ***REMOVED***Function***REMOVED*** props.navigate - Function from `useNavigate` hook for navigation.
 * @param ***REMOVED***Dispatch<SetStateAction<string>>***REMOVED*** props.setUsername - Function to update the username in the parent component's state.
 * @param ***REMOVED***Dispatch<SetStateAction<string>>***REMOVED*** props.setSecurityQuestion - Function to update the security question in the parent component's state.
 * @param ***REMOVED***Dispatch<SetStateAction<string>>***REMOVED*** props.setErr - Function to update the error message in the parent component's state.
 * @param ***REMOVED***Dispatch<SetStateAction<boolean>>***REMOVED*** props.setShow - Function to control the visibility of the error message.
 * @returns ***REMOVED***React.ReactElement***REMOVED*** The UsernameForm component.
 */
const UsernameForm = (***REMOVED***
  navigate,
  setUsername,
  setSecurityQuestion,
  setErr,
  setShow,
***REMOVED***: UsernameFormProps): React.ReactElement => ***REMOVED***
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => ***REMOVED***
    e.preventDefault();
    const username: string = e.currentTarget.username.value;
    try ***REMOVED***
      const res = await getSecurityQuestion(username);
      setUsername(username);
      setSecurityQuestion(res);
***REMOVED*** catch (err: any) ***REMOVED***
      setErr(err.request.responseText);
      setShow(true);
      setUsername("");
***REMOVED***
  ***REMOVED***;

  return (
    <Form onSubmit=***REMOVED***handleSubmit***REMOVED***>
      <Row>
        <Form.Group as=***REMOVED***Col***REMOVED*** className='mb-3' controlId='username'>
          <Form.Control type='text' placeholder='Username' />
        </Form.Group>
      </Row>

      <Button variant='outline-primary' type='submit'>
        Update Password
      </Button>

      <Button variant='primary' className='mx-3' onClick=***REMOVED***() => navigate("/")***REMOVED***>
        <FontAwesomeIcon icon=***REMOVED***faCircleLeft***REMOVED*** />
      </Button>
    </Form>
  );
***REMOVED***;

export default UsernameForm;
