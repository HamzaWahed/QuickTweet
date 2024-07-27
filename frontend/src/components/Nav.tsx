import ***REMOVED*** faUser ***REMOVED*** from "@fortawesome/free-regular-svg-icons";
import ***REMOVED*** faRightFromBracket, faSearch, faUserGroup ***REMOVED*** from "@fortawesome/free-solid-svg-icons";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** Col, Dropdown, Row ***REMOVED*** from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import ***REMOVED*** Link, useNavigate ***REMOVED*** from "react-router-dom";
import ***REMOVED*** updateStatus ***REMOVED*** from "../api/auth";
import ***REMOVED*** addFriend, getFriendRequests, searchUsers ***REMOVED*** from "../api/userApi";
import ***REMOVED*** INTERESTS ***REMOVED*** from "../constants";
import ***REMOVED*** NavBarProps, SearchResult, User ***REMOVED*** from "../types";
import AsyncSelect from "react-select/async";
import ***REMOVED*** components, SingleValue ***REMOVED*** from "react-select";

/**
 * Represents the navigation bar component of the application.
 *
 * This component displays the main navigation bar at the top of the application, providing links to different sections
 * of the application and displaying user-specific information such as friend requests. It supports functionalities like
 * searching, viewing friend requests, and logging out.
 *
 * The navigation bar is responsive and integrates with React Bootstrap for styling. It uses FontAwesome icons for visual
 * elements and interacts with the application's authentication and user APIs to fetch friend requests and handle user logout.
 *
 * @component
 * @param ***REMOVED***NavBarProps***REMOVED*** props - The properties passed to the Nav component.
 * @param ***REMOVED***string***REMOVED*** props.username - The username of the currently logged-in user.
 * @param ***REMOVED***Dispatch<SetStateAction<boolean>>***REMOVED*** props.setAuth - Function to update the authentication state of the application.
 * @param ***REMOVED***boolean***REMOVED*** props.isAdmin - Indicates if the currently logged-in user has administrative privileges.
 */
const Nav = (***REMOVED*** username, setAuth, isAdmin ***REMOVED***: NavBarProps) => ***REMOVED***
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState<User[]>([]);

  const fetchRequests = async () => ***REMOVED***
    try ***REMOVED***
      const requests = await getFriendRequests(username);
      setFriendRequests(requests);
***REMOVED*** catch (err) ***REMOVED***
      console.error(err);
***REMOVED***
  ***REMOVED***;

  useEffect(() => ***REMOVED***
    fetchRequests();
***REMOVED*** []);

  const getSearchResults = async (query: string) => ***REMOVED***
    if (query.length === 0) ***REMOVED***
      return;
***REMOVED***

    const results = await searchUsers(query);

    // map the results to the format expected by the search component
    // each element should have a value and a path to the element's page
    let combinedResults = results.map(user => (***REMOVED***
      value: user.username || "",
      label: user.username || "",
      path: `/profile/$***REMOVED***user.username***REMOVED***`,
***REMOVED***));
    combinedResults = combinedResults.concat(
      INTERESTS.filter(interest => interest.value.toLowerCase().includes(query.toLowerCase())).map(
        interest => (***REMOVED***
          value: interest.value,
          label: interest.value,
          path: `/groups/$***REMOVED***interest.value***REMOVED***`,
    ***REMOVED***)
      )
    );

    return combinedResults;
  ***REMOVED***;

  const DropdownIndicator = (props: any) => ***REMOVED***
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator ***REMOVED***...props***REMOVED***>
          <FontAwesomeIcon icon=***REMOVED***faSearch***REMOVED*** />
        </components.DropdownIndicator>
      )
    );
  ***REMOVED***;

  const handleLogout = async () => ***REMOVED***
    try ***REMOVED***
      await updateStatus(username, "Offline");
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("user");
      setAuth(false);
      navigate("/");
***REMOVED*** catch (err) ***REMOVED***
      console.error(err);
***REMOVED***
  ***REMOVED***;

  const onAddFriend = async (friendUsername: string | null) => ***REMOVED***
    if (friendUsername == null) ***REMOVED***
      return;
***REMOVED***

    const msg = await addFriend(username, friendUsername);
    console.log(msg);
    fetchRequests();
  ***REMOVED***;

  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Container
        fluid
        className='align-items-center justify-content-around'
        style=***REMOVED******REMOVED*** width: "90%" ***REMOVED******REMOVED***
      >
        <Col>
          <Navbar.Brand className='ms-5'>
            <Link to='/'>
              <Image
                src=***REMOVED***import.meta.env.VITE_LOGO_PATH***REMOVED***
                width='60'
                height='60'
                className='d-inline-block align-top'
              />
            </Link>
          </Navbar.Brand>
        </Col>

        <Col>
          <div className='w-50 my-3' style=***REMOVED******REMOVED*** position: "relative", zIndex: 1000 ***REMOVED******REMOVED***>
            <AsyncSelect
              cacheOptions
              defaultOptions
              components=***REMOVED******REMOVED*** DropdownIndicator ***REMOVED******REMOVED***
              onChange=***REMOVED***(selectedOption: SingleValue<SearchResult>) => ***REMOVED***
                if (selectedOption !== null) ***REMOVED***
                  navigate(selectedOption.path);
            ***REMOVED***
          ***REMOVED******REMOVED***
              loadOptions=***REMOVED***(query, callback) => ***REMOVED***
                getSearchResults(query).then(options => ***REMOVED***
                  callback(options || []);
            ***REMOVED***);
          ***REMOVED******REMOVED***
            />
          </div>
        </Col>

        <Row className='align-items-center'>
          ***REMOVED***isAdmin && (
            <Col>
              <Link to='/admin' style=***REMOVED******REMOVED*** textDecoration: "none" ***REMOVED******REMOVED***>
                Admin
              </Link>
            </Col>
          )***REMOVED***

          <Col>
            <Dropdown onSelect=***REMOVED***onAddFriend***REMOVED***>
              <Dropdown.Toggle variant='outline-primary' id='navDropdown'>
                <FontAwesomeIcon icon=***REMOVED***faUserGroup***REMOVED*** />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                ***REMOVED***friendRequests && friendRequests.length > 0 ? (
                  <>
                    ***REMOVED***friendRequests.map(request => (
                      <Dropdown.Item
                        key=***REMOVED***request.username***REMOVED***
                        eventKey=***REMOVED***request.username***REMOVED***
                        className='mb-3'
                      >
                        <Image src=***REMOVED***request.photo***REMOVED*** className='w-25 me-1' />
                        <span>***REMOVED***request.username***REMOVED***</span>
                        <span className='ms-3 me-5 w-50 border p-2 bg-primary text-white'>
                          Accept
                        </span>
                      </Dropdown.Item>
                    ))***REMOVED***
                  </>
                ) : (
                  <Dropdown.Item disabled>No Requests</Dropdown.Item>
                )***REMOVED***
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className='me-5'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='navDropdown'>
                ***REMOVED***username***REMOVED***
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick=***REMOVED***() => navigate(`/profile/$***REMOVED***username***REMOVED***`)***REMOVED***>
                  <FontAwesomeIcon icon=***REMOVED***faUser***REMOVED*** /> Profile
                </Dropdown.Item>
                <Dropdown.Item onClick=***REMOVED***handleLogout***REMOVED***>
                  <FontAwesomeIcon icon=***REMOVED***faRightFromBracket***REMOVED*** /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
***REMOVED***;

export default Nav;
