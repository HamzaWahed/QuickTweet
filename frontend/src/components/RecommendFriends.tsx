import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ***REMOVED*** User, UserProfileProps ***REMOVED*** from "../types";
import ***REMOVED*** getAllUsers, getFriends ***REMOVED*** from "../api/userApi";

/**
 * `FriendRecommendations` is a React component that renders a list of recommended friends for the current user.
 *
 * This component fetches a list of all users and the current user's friends from the server. It then filters out the
 * current user's friends and the current user themselves from the list of all users to generate a list of recommended
 * friends. These recommendations are based on the premise that users not currently in the user's friend list could be
 * potential friends.
 *
 * The recommendations are displayed as a grid of cards, each representing a different user. Each card includes the user's
 * profile picture and username. The grid layout adapts to different screen sizes, ensuring a responsive design.
 *
 * @component
 * @param ***REMOVED***UserProfileProps***REMOVED*** props - The properties passed to the FriendRecommendations component.
 * @param ***REMOVED***string***REMOVED*** props.currentUsername - The username of the currently logged-in user, used to filter out the current user
 *                                         from the recommendations.
 * @returns A React element that displays a list of recommended friends in a responsive grid layout.
 */
const FriendRecommendations = (***REMOVED*** currentUsername ***REMOVED***: UserProfileProps) => ***REMOVED***
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => ***REMOVED***
    const fetchUsers = async () => ***REMOVED***
      const users: User[] = await getAllUsers();
      const friends: User[] = await getFriends(currentUsername);
      const friendUsernames = friends.map(friend => friend.username);
      const uniqueUsers: User[] = users.reduce((result: User[], user: User) => ***REMOVED***
        if (!friendUsernames.includes(user.username)) ***REMOVED***
          result.push(user);
    ***REMOVED***
        return result;
  ***REMOVED*** []);
      setAllUsers(uniqueUsers);
***REMOVED***;

    fetchUsers();
***REMOVED*** [currentUsername]);

  return (
    <div style=***REMOVED******REMOVED*** margin: "5vw" ***REMOVED******REMOVED***>
      <h1 style=***REMOVED******REMOVED*** marginBottom: "5%", fontSize: 30 ***REMOVED******REMOVED*** className='display-5'>
        Recommended friends
      </h1>
      <Row xs=***REMOVED***1***REMOVED*** md=***REMOVED***4***REMOVED*** className='g-4'>
        ***REMOVED***allUsers
          .filter(user => user.username != currentUsername)
          .slice(0, 3)
          .map(user => (
            <Col key=***REMOVED***user.username***REMOVED***>
              <Card style=***REMOVED******REMOVED*** width: "18rem", margin: "auto" ***REMOVED******REMOVED***>
                <Card.Img
                  style=***REMOVED******REMOVED***
                    margin: "auto",
                    padding: "15%",
                    width: "20vh",
                    height: "20vh",
              ***REMOVED******REMOVED***
                  variant='top'
                  src=***REMOVED***user.photo ? user.photo : "././img/fox.png"***REMOVED***
                />
                <Card.Body style=***REMOVED******REMOVED*** margin: "auto" ***REMOVED******REMOVED***>
                  <Card.Title className='text-center'>***REMOVED***user.username***REMOVED***</Card.Title>
                  <Button variant='primary' href=***REMOVED***`http://localhost:5173/profile/$***REMOVED***user.username***REMOVED***`***REMOVED***>
                    Visit profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))***REMOVED***
      </Row>
    </div>
  );
***REMOVED***;

export default FriendRecommendations;
