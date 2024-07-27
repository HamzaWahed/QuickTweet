import ***REMOVED*** faCircleLeft ***REMOVED*** from "@fortawesome/free-regular-svg-icons";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** Button, Form ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** useNavigate ***REMOVED*** from "react-router-dom";
import ErrorToast from "./ErrorToast";
import ***REMOVED*** useFormik ***REMOVED*** from "formik";
import * as Yup from "yup";
import ***REMOVED*** updatePassword ***REMOVED*** from "../api/userApi";
import UsernameForm from "./UsernameForm";

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
const ForgotPasswordForm = () => ***REMOVED***
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);

  const formik = useFormik(***REMOVED***
    initialValues: ***REMOVED***
      password: "",
      answer: "",
***REMOVED***
    validationSchema: Yup.object(***REMOVED***
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.***REMOVED***8,***REMOVED***)/,
          "Password must have at least 1 uppercase character, 1 lowercase character, 1 number and 1 special character"
        )
        .required("Required"),
      answer: Yup.string().required(),
***REMOVED***),
    onSubmit: async values => ***REMOVED***
      try ***REMOVED***
        await updatePassword(username, values);
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ***REMOVED*** catch (err: any) ***REMOVED***
        setErr(err.msg);
        setShow(true);
  ***REMOVED***
***REMOVED***
  ***REMOVED***);

  return (
    <>
      <ErrorToast title='Invalid Username or Password' msg=***REMOVED***err***REMOVED*** show=***REMOVED***show***REMOVED*** setShow=***REMOVED***setShow***REMOVED*** />
      ***REMOVED***username !== "" ? (
        <Form onSubmit=***REMOVED***formik.handleSubmit***REMOVED***>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Control
              type='password'
              placeholder='New Password'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.password***REMOVED***
            />
            ***REMOVED***formik.touched.password && formik.errors.password ? (
              <div className='text-danger'>***REMOVED***formik.errors.password***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>

          <Form.Group className='mb-3' controlId='securityQuestion'>
            <Form.Control disabled type='text' value=***REMOVED***securityQuestion***REMOVED*** />
          </Form.Group>

          <Form.Group className='mb-3' controlId='answer'>
            <Form.Control
              required
              type='text'
              placeholder='Answer'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.answer***REMOVED***
            />
            ***REMOVED***formik.touched.answer && formik.errors.answer ? (
              <div className='text-danger'>***REMOVED***formik.errors.answer***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>

          <Button variant='outline-primary' onClick=***REMOVED***formik.submitForm***REMOVED***>
            Update Password
          </Button>

          <Button variant='primary' className='mx-3' onClick=***REMOVED***() => navigate("/")***REMOVED***>
            <FontAwesomeIcon icon=***REMOVED***faCircleLeft***REMOVED*** />
          </Button>
        </Form>
      ) : (
        <UsernameForm
          navigate=***REMOVED***navigate***REMOVED***
          setUsername=***REMOVED***setUsername***REMOVED***
          setSecurityQuestion=***REMOVED***setSecurityQuestion***REMOVED***
          setErr=***REMOVED***setErr***REMOVED***
          setShow=***REMOVED***setShow***REMOVED***
        />
      )***REMOVED***
    </>
  );
***REMOVED***;

export default ForgotPasswordForm;
