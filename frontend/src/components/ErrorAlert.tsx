import ***REMOVED*** faHouse ***REMOVED*** from "@fortawesome/free-solid-svg-icons/faHouse";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** Alert, Button, Container ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** useNavigate ***REMOVED*** from "react-router";
import ***REMOVED*** Link ***REMOVED*** from "react-router-dom";

const ErrorAlert = () => ***REMOVED***
  const navigate = useNavigate();
  return (
    <Container className='mt-5'>
      <Button variant='outline-secondary' onClick=***REMOVED***() => navigate("/")***REMOVED*** className='mb-3'>
        <FontAwesomeIcon icon=***REMOVED***faHouse***REMOVED*** />
      </Button>
      <Alert variant='danger' show=***REMOVED***true***REMOVED*** onClose=***REMOVED***() => navigate("/")***REMOVED*** dismissible>
        <Alert.Heading>Oh snap! The user does not exist!</Alert.Heading>
        <p>
          The user you're looking for does not exist. Please check the username and try again!
          <br />
          <Link to='/'>Home</Link>
        </p>
      </Alert>
    </Container>
  );
***REMOVED***;

export default ErrorAlert;
