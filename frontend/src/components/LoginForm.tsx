import axios from "axios";
import React, ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** Button, Form ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** Link, useNavigate ***REMOVED*** from "react-router-dom";
import ErrorToast from "./ErrorToast";
import ***REMOVED*** LoginFormProps ***REMOVED*** from "../types";
import ***REMOVED*** updateStatus ***REMOVED*** from "../api/auth";

/**
 * LoginForm component provides a form for users to log in. It captures user input for username and password,
 * and attempts to authenticate the user via an API call. On successful login, it stores the JWT token in sessionStorage,
 * updates the user's status to "Available", and navigates to the user's dashboard. In case of an error during login,
 * it displays an error message using the ErrorToast component.
 *
 * @component
 * @param ***REMOVED***LoginFormProps***REMOVED*** props - The props for the LoginForm component.
 * @param ***REMOVED***Dispatch<SetStateAction<boolean>>***REMOVED*** props.setAuth - Function to update the authentication state in the parent component.
 * @param ***REMOVED***User***REMOVED*** props.user - The user object to be updated with form inputs.
 * @param ***REMOVED***Dispatch<SetStateAction<User>>***REMOVED*** props.setUser - Function to update the user object in the parent component.
 */
const LoginForm = (***REMOVED*** setAuth, user, setUser ***REMOVED***: LoginFormProps) => ***REMOVED***
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
    e.preventDefault();
    setUser(***REMOVED***
      ...user,
      [e.target.name]: e.target.value,
***REMOVED***);
  ***REMOVED***;

  const handleLogin = (e: React.SyntheticEvent) => ***REMOVED***
    e.preventDefault();
    axios
      .post(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/login`, user, ***REMOVED***
        headers: ***REMOVED*** "Content-Type": "application/json" ***REMOVED***,
  ***REMOVED***)
      .then(res => ***REMOVED***
        const jwtToken = res.headers.authorization;

        if (jwtToken != null) ***REMOVED***
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
    ***REMOVED***

        updateStatus(user.username, "Available");
        sessionStorage.setItem("user", JSON.stringify(user));
  ***REMOVED***)
      .catch(err => ***REMOVED***
        setErr(err.response.data);
        setShow(true);
  ***REMOVED***);
  ***REMOVED***;

  return (
    <div>
      <Form onSubmit=***REMOVED***handleLogin***REMOVED***>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Control
            name='username'
            type='text'
            placeholder='Username'
            onChange=***REMOVED***handleChange***REMOVED***
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            className='mb-3'
            onChange=***REMOVED***handleChange***REMOVED***
          />
          <Link to=***REMOVED***"/forgotpassword"***REMOVED***>Forgot Password?</Link>
        </Form.Group>

        <Button variant='primary' className='me-3' type='submit'>
          Submit
        </Button>

        <Button variant='outline-primary' onClick=***REMOVED***() => navigate("/register")***REMOVED***>
          Create Account
        </Button>
      </Form>
      <ErrorToast title='Login Failed' msg=***REMOVED***err***REMOVED*** show=***REMOVED***show***REMOVED*** setShow=***REMOVED***setShow***REMOVED*** />
    </div>
  );
***REMOVED***;

export default LoginForm;
