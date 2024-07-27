import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** Button, Col, Container, Image, Row, Spinner ***REMOVED*** from "react-bootstrap";
import ***REMOVED*** checkUserInterest, countUsersWithInterest ***REMOVED*** from "../api/interestApi";
import ***REMOVED*** GroupPageProps ***REMOVED*** from "../types";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** faHouse ***REMOVED*** from "@fortawesome/free-solid-svg-icons";
import ***REMOVED*** useNavigate ***REMOVED*** from "react-router";

const GroupPage = (***REMOVED*** user, interest ***REMOVED***: GroupPageProps) => ***REMOVED***
  const [sharedInterestCount, setSharedInterestCount] = useState(0);
  const [userIsInGroup, setUserIsInGroup] = useState(false);
  const [loading, setLoading] = useState(true);
  const imageSrc = `../img/$***REMOVED***interest***REMOVED***.png`;
  const navigate = useNavigate();

  useEffect(() => ***REMOVED***
    const fetchData = async () => ***REMOVED***
      setLoading(true);
      if (interest) ***REMOVED***
        try ***REMOVED***
          if (user.username) ***REMOVED***
            const userHasInterest = await checkUserInterest(user.username, interest);
            if (userHasInterest) ***REMOVED***
              setUserIsInGroup(true);
        ***REMOVED***
      ***REMOVED***
          const count = await countUsersWithInterest(interest);
          if (count == undefined) ***REMOVED***
            return;
      ***REMOVED***
          setSharedInterestCount(count);
    ***REMOVED*** catch (error) ***REMOVED***
          console.error("Error fetching data:", error);
    ***REMOVED***
  ***REMOVED***
      setLoading(false);
***REMOVED***;
    fetchData();
***REMOVED*** []);

  let message = "";

  if (sharedInterestCount === 0) ***REMOVED***
    message = `No users are in this group.`;
  ***REMOVED*** else ***REMOVED***
    if (userIsInGroup) ***REMOVED***
      if (sharedInterestCount === 1) ***REMOVED***
        message = "You are in this group.";
  ***REMOVED*** else if (sharedInterestCount === 2) ***REMOVED***
        message = "You and one other person are in this group.";
  ***REMOVED*** else if (sharedInterestCount > 2) ***REMOVED***
        message = `You and $***REMOVED***sharedInterestCount - 1***REMOVED*** other users are in this group.`;
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      if (sharedInterestCount === 1) ***REMOVED***
        message = "One user is in this group.";
  ***REMOVED*** else if (sharedInterestCount > 1) ***REMOVED***
        message = `$***REMOVED***sharedInterestCount***REMOVED*** users are in this group.`;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  if (loading) ***REMOVED***
    return <Spinner animation='border' variant='primary' />;
  ***REMOVED*** else ***REMOVED***
    return (
      <Container className='mt-5'>
        <Button variant='outline-secondary' onClick=***REMOVED***() => navigate("/")***REMOVED*** className='mb-3'>
          <FontAwesomeIcon icon=***REMOVED***faHouse***REMOVED*** />
        </Button>
        <Row className='justify-content-md-center' style=***REMOVED******REMOVED*** marginTop: "10%" ***REMOVED******REMOVED***>
          <Col md=***REMOVED***6***REMOVED***>
            <div className='text-center'>
              <Image
                src=***REMOVED***imageSrc***REMOVED***
                alt='Group Picture'
                roundedCircle
                thumbnail
                style=***REMOVED******REMOVED*** width: 250, height: 250 ***REMOVED******REMOVED***
              />
            </div>
            <h1 className='text-center' style=***REMOVED******REMOVED*** marginTop: "5%" ***REMOVED******REMOVED***>
              ***REMOVED***interest***REMOVED***
            </h1>
            <div className='text-center'>
              <p>***REMOVED***message***REMOVED***</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  ***REMOVED***
***REMOVED***;

export default GroupPage;
