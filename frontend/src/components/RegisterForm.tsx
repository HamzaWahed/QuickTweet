import ***REMOVED*** Button, Form, Col, Row ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** useNavigate ***REMOVED*** from "react-router";
import ***REMOVED*** useFormik ***REMOVED*** from "formik";
import * as Yup from "yup";
import ***REMOVED*** useState ***REMOVED*** from "react";
import ErrorToast from "./ErrorToast";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** faCircleLeft ***REMOVED*** from "@fortawesome/free-regular-svg-icons";
import ***REMOVED*** createUserRequest ***REMOVED*** from "../api/userApi";

/**
 * `RegisterForm` is a React component for rendering a user registration form.
 *
 * This component utilizes React Bootstrap for styling and layout, providing a user-friendly interface for registration.
 * It includes form fields for email, username, password, role, a security question, and an answer to the security question.
 * The form uses Formik for form state management and Yup for validation, ensuring that user inputs meet specific criteria
 * before submission.
 *
 * The email field specifically requires a valid Dalhousie University email address. The password field enforces a minimum
 * length and a mix of character types for security. Upon successful validation and submission, a user creation request is
 * sent to the server via the `createUserRequest` API function.
 *
 * Error handling is implemented to display feedback to the user in case of an invalid submission attempt or an error during
 * the user creation process. A loading state is also managed to provide visual feedback during the submission process.
 *
 * @component
 * @returns A React element that renders the registration form with validation and error handling.
 */
const RegisterForm = () => ***REMOVED***
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const securityQuestions = [
    "What is the name of your first pet?",
    "What is your grandmother's maiden name?",
    "What is your favorite drink?",
  ];

  const formik = useFormik(***REMOVED***
    initialValues: ***REMOVED***
      email: "",
      username: "",
      password: "",
      role: "",
      securityQuestion: "",
      securityQuestionAnswer: "",
***REMOVED***
    validationSchema: Yup.object(***REMOVED***
      email: Yup.string()
        .email("Invalid email address")
        .matches(/[A-Z0-9._%+-]+@dal\.ca/i, "Please choose a valid Dalhousie email")
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.***REMOVED***8,***REMOVED***)/,
          "Password must have at least 1 uppercase character, 1 lowercase character, 1 number and 1 special character"
        )
        .required("Required"),
      securityQuestion: Yup.string().required("Required"),
      securityQuestionAnswer: Yup.string().required("Required"),
***REMOVED***),
    onSubmit: async values => ***REMOVED***
      if (isSubmitting) return;

      setIsSubmitting(true);
      const user = ***REMOVED***
        email: values.email,
        username: values.username,
        password: values.password,
        role: "USER",
        securityQuestion: values.securityQuestion,
        securityQuestionAnswer: values.securityQuestionAnswer,
  ***REMOVED***;

      try ***REMOVED***
        const res = await createUserRequest(user);
        console.log(res);
        navigate("/");
  ***REMOVED*** catch (err: any) ***REMOVED***
        setErr(err.msg);
        setShow(true);
  ***REMOVED*** finally ***REMOVED***
        setIsSubmitting(false);
  ***REMOVED***
***REMOVED***
  ***REMOVED***);

  return (
    <>
      <Form onSubmit=***REMOVED***formik.handleSubmit***REMOVED***>
        <Row className='mb-3'>
          <Form.Group as=***REMOVED***Col***REMOVED*** controlId='email'>
            <Form.Control
              type='email'
              placeholder='Email'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.email***REMOVED***
            />
            <Form.Text className='text-danger'>
              ***REMOVED***formik.touched.email && formik.errors.email ? (
                <div className='text-danger'>***REMOVED***formik.errors.email***REMOVED***</div>
              ) : null***REMOVED***
            </Form.Text>
          </Form.Group>

          <Form.Group as=***REMOVED***Col***REMOVED*** controlId='username'>
            <Form.Control
              type='text'
              placeholder='Username'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.username***REMOVED***
            />
            ***REMOVED***formik.touched.username && formik.errors.username ? (
              <div className='text-danger'>***REMOVED***formik.errors.username***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as=***REMOVED***Col***REMOVED*** className='mb-3' controlId='password'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.password***REMOVED***
            />
            ***REMOVED***formik.touched.password && formik.errors.password ? (
              <div className='text-danger'>***REMOVED***formik.errors.password***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className='mb-3'>
            <Form.Select
              name='securityQuestion'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.securityQuestion***REMOVED***
            >
              <option disabled value=''>
                Security Question
              </option>
              ***REMOVED***securityQuestions.map((question, i) => (
                <option key=***REMOVED***i***REMOVED*** value=***REMOVED***question***REMOVED***>
                  ***REMOVED***question***REMOVED***
                </option>
              ))***REMOVED***
            </Form.Select>
            ***REMOVED***formik.touched.securityQuestion && formik.errors.securityQuestion ? (
              <div className='text-danger'>***REMOVED***formik.errors.securityQuestion***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className='mb-3'>
            <Form.Control
              name='securityQuestionAnswer'
              type='text'
              placeholder='Answer'
              onChange=***REMOVED***formik.handleChange***REMOVED***
              onBlur=***REMOVED***formik.handleBlur***REMOVED***
              value=***REMOVED***formik.values.securityQuestionAnswer***REMOVED***
            />
            ***REMOVED***formik.touched.securityQuestionAnswer && formik.errors.securityQuestionAnswer ? (
              <div className='text-danger'>***REMOVED***formik.errors.securityQuestionAnswer***REMOVED***</div>
            ) : null***REMOVED***
          </Form.Group>
        </Row>

        <Button variant='outline-primary' type='submit' onClick=***REMOVED***formik.submitForm***REMOVED***>
          Create Account
        </Button>

        <Button variant='primary' className='mx-3' onClick=***REMOVED***() => navigate("/")***REMOVED***>
          <FontAwesomeIcon icon=***REMOVED***faCircleLeft***REMOVED*** />
        </Button>
      </Form>

      <ErrorToast title='Account could not be created' msg=***REMOVED***err***REMOVED*** show=***REMOVED***show***REMOVED*** setShow=***REMOVED***setShow***REMOVED*** />
    </>
  );
***REMOVED***;

export default RegisterForm;
