import ***REMOVED*** Col, Container, Row ***REMOVED*** from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ***REMOVED*** FormProps ***REMOVED*** from "../types";

/**
 * `UserLoginPage` is a React component that renders the user login page.
 *
 * This component displays a login page layout consisting of a background image and a login form. The page is divided into
 * two main columns using Bootstrap's Grid system: one for the background image and the other for the login form. The login
 * form itself is passed as a prop to allow for flexibility and reuse of the form component in different contexts.
 *
 * @component
 * @param ***REMOVED***FormProps***REMOVED*** props - The properties passed to the UserLoginPage component, including the form component and its elements.
 * @returns A React element that renders the login page with a background image and a login form.
 */
const UserLoginPage = (***REMOVED*** Form, formComponents ***REMOVED***: FormProps) => ***REMOVED***
  const style = ***REMOVED***
    maxWidth: "100vw",
    maxHeight: "100vh",
    backgroundSize: "contain",
  ***REMOVED***;

  const iconStyle = ***REMOVED***
    maxWidth: "15vw",
    maxHeight: "auto",
    backgroundSize: "contain",
  ***REMOVED***;

  return (
    <Container>
      <Row>
        <Col>
          <Image style=***REMOVED***style***REMOVED*** className='mx-auto d-block' src=***REMOVED***import.meta.env.VITE_LOGIN_BACKGROUND_PATH***REMOVED*** />
        </Col>
        <Col className='pe-5' style=***REMOVED******REMOVED*** height: "100vh", width: "100%" ***REMOVED******REMOVED***>
          <Row style=***REMOVED******REMOVED*** height: "40vh", width: "100%" ***REMOVED******REMOVED*** className='align-items-center'>
            <Col>
              <h1 className='ps-2 align-text-top display-4' style=***REMOVED******REMOVED*** display: "inline" ***REMOVED******REMOVED***>
                QuickTweet
              </h1>
              <Image style=***REMOVED***iconStyle***REMOVED*** src=***REMOVED***import.meta.env.VITE_LOGO_PATH***REMOVED*** />
            </Col>
          </Row>
          <Row style=***REMOVED******REMOVED*** height: "60vh", width: "100%" ***REMOVED******REMOVED*** className='align-items-˝start'>
            <Col>
              <Form ***REMOVED***...formComponents***REMOVED*** />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
***REMOVED***;

export default UserLoginPage;
