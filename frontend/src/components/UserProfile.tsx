import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED***
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  DropdownButton,
  Dropdown,
  Spinner,
***REMOVED*** from "react-bootstrap";
import ***REMOVED*** useForm, SubmitHandler ***REMOVED*** from "react-hook-form";
import ***REMOVED*** User, UserData, UserProfileProps ***REMOVED*** from "../types";
import ***REMOVED***
  addFriendRequest,
  getFriendRequests,
  getFriends,
  getUserData,
  postUserData,
  deleteFriend,
***REMOVED*** from "../api/userApi";
import ***REMOVED*** useNavigate, useParams ***REMOVED*** from "react-router";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** faHouse ***REMOVED*** from "@fortawesome/free-solid-svg-icons/faHouse";
import Select, ***REMOVED*** MultiValue ***REMOVED*** from "react-select";
import ErrorAlert from "./ErrorAlert";
import ***REMOVED*** INTERESTS ***REMOVED*** from "../constants";

/**
 * `UserProfile` renders the user profile page. It allows for viewing and editing
 * a user's profile, including their interests, status, and personal information.
 *
 * @component
 * @param ***REMOVED***UserProfileProps***REMOVED*** props - The props for the UserProfile component.
 * @param ***REMOVED***string***REMOVED*** props.currentUsername - The username of the currently logged-in user.
 *
 * @returns ***REMOVED***React.ReactElement***REMOVED*** The UserProfile component.
 *
 * @example
 * ```tsx
 * <UserProfile currentUsername="johndoe" />
 * ```
 *
 * ### API Functions Used
 * - `getFriends` to fetch the user's friends.
 * - `getUserData` to fetch the user's data.
 * - `postUserData` to update the user's data.
 * - `deleteFriend` to remove a friend from the user's friend list.
 *
 * ### External Libraries and Components Used
 * - `react-router` for routing and navigation.
 * - `@fortawesome/react-fontawesome` for icons.
 * - `react-select` for the interests multi-select input.
 * - `ErrorAlert` for displaying error messages.
 *
 * ### State Management
 * - Uses local state for managing editing mode, user interests, loading state, friendship status, and more.
 * - Utilizes `useForm` from `react-hook-form` for form handling.
 *
 * ### Side Effects
 * - On component mount, fetches the user's data and updates the component state accordingly.
 */
const UserProfile = (***REMOVED*** currentUsername ***REMOVED***: UserProfileProps): React.ReactElement => ***REMOVED***
  const [editing, setEditing] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const ***REMOVED***
    register,
    handleSubmit,
    formState: ***REMOVED*** errors ***REMOVED***,
  ***REMOVED*** = useForm<User>();
  const [status, setStatus] = useState<string | undefined>("Available");
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const navigate = useNavigate();
  const ***REMOVED*** username ***REMOVED*** = useParams();
  const [user, setUser] = useState<User>(***REMOVED***
    username: username,
    email: undefined,
    password: undefined,
    bio: undefined,
    role: undefined,
    photo: undefined,
    interests: interests,
    status: undefined,
    friends: [],
    friendRequests: [],
  ***REMOVED***);

  useEffect(() => ***REMOVED***
    /**
     * Asynchronously fetches and updates the user profile data.
     *
     * This function performs the following operations:
     * 1. Initiates loading state to indicate the start of data fetching.
     * 2. Retrieves detailed user data, the list of friends, and friend requests for the current user.
     * 3. Updates the component state with the fetched data, including user details, status, interests, and friends.
     * 4. Determines if the current user is a friend or has a pending friend request with the profile being viewed.
     * 5. Resets the loading state upon completion of data fetching.
     *
     * It is triggered upon component mount and whenever there's a change in the user's username, the triggerFetch state,
     * the length of the user's friend requests, or the currentUsername state.
     */
    const fetchData = async () => ***REMOVED***
      setLoading(true);
      const data = await getUserData(user.username);
      const friends = await getFriends(user.username);
      const friendRequests = await getFriendRequests(user.username);
      const currentUserFriendRequests = await getFriendRequests(currentUsername);

      setUser(***REMOVED***
        ...data,
        username: user.username,
        friends: friends,
        friendRequests: friendRequests,
  ***REMOVED***);
      setStatus(data.status);
      setInterests(data.interests || []);

      let userExists: User | undefined = undefined;

      // check if current user is in the friends list of the user whose profile is being viewed
      if (friends) ***REMOVED***
        userExists = friends.find((u: User) => u.username === currentUsername);
        setIsFriend(userExists !== undefined);
  ***REMOVED***

      // check if the current user is in the pending request list of the user whose profile is being viewed
      if (friendRequests) ***REMOVED***
        userExists = friendRequests.find((u: User) => u.username === currentUsername);
        setPendingRequest(userExists !== undefined);
  ***REMOVED***

      // check if the user whose profile is being viewed in the is in the pending request list of the current user
      // we only need to check if the user is not already friends, or they are not in the pending request list.
      if (currentUserFriendRequests && !userExists) ***REMOVED***
        userExists = currentUserFriendRequests.find((u: User) => u.username === user.username);
        setPendingRequest(userExists !== undefined);
  ***REMOVED***

      setLoading(false);
***REMOVED***;

    fetchData();
***REMOVED*** [user.username, triggerFetch, currentUsername]);

  const onSubmit: SubmitHandler<User> = async data => ***REMOVED***
    if (user.username === undefined || currentUsername !== user.username) ***REMOVED***
      return;
***REMOVED***

    const userObj: UserData = ***REMOVED***
      username: user.username,
      bio: data.bio,
      status: status,
      photo: data.photo,
      interests: interests,
***REMOVED***;

    const res = await postUserData(userObj, user.username);
    console.log(res);
    setEditing(false);
    setTriggerFetch(!triggerFetch);
  ***REMOVED***;

  const onAddFriend = async () => ***REMOVED***
    await addFriendRequest(currentUsername, user.username);
    setTriggerFetch(!triggerFetch);
  ***REMOVED***;

  const onDeleteFriend = async () => ***REMOVED***
    await deleteFriend(currentUsername, user.username);
    setTriggerFetch(!triggerFetch);
  ***REMOVED***;

  const handleInterestChange = async (
    selectedOptions: MultiValue<***REMOVED*** value: string; label: string ***REMOVED***>
  ) => ***REMOVED***
    const selectedValues = selectedOptions.map(option => option.value);
    setInterests(selectedValues);
  ***REMOVED***;

  if (loading) ***REMOVED***
    return <Spinner animation='border' variant='primary' />;
  ***REMOVED*** else if (user.email === undefined) ***REMOVED***
    return <ErrorAlert />;
  ***REMOVED*** else ***REMOVED***
    return (
      <Container className='mt-5'>
        <Button variant='outline-secondary' onClick=***REMOVED***() => navigate("/")***REMOVED*** className='mb-3'>
          <FontAwesomeIcon icon=***REMOVED***faHouse***REMOVED*** />
        </Button>
        <Row className='justify-content-md-center'>
          <Col md=***REMOVED***6***REMOVED***>
            <div className='text-center'>
              <Image
                src=***REMOVED***user.photo ? user.photo : import.meta.env.VITE_LOGO_PATH***REMOVED***
                alt='Profile Picture'
                roundedCircle
                thumbnail
                style=***REMOVED******REMOVED*** width: 150, height: 150 ***REMOVED******REMOVED***
              />
              <h2 className='mt-3 display-3'>***REMOVED***user.username***REMOVED***</h2>
            </div>
            ***REMOVED***!editing ? (
              <>
                <Row>
                  <Button
                    disabled
                    style=***REMOVED******REMOVED***
                      backgroundColor:
                        status === "Available"
                          ? "green"
                          : status === "Busy"
                          ? "red"
                          : status === "Last seen recently"
                          ? "blue"
                          : status === "Away"
                          ? "gray"
                          : "black",
                      borderColor:
                        status === "Available"
                          ? "green"
                          : status === "Busy"
                          ? "red"
                          : status === "Last seen recently"
                          ? "blue"
                          : status === "Away"
                          ? "gray"
                          : "black",
                ***REMOVED******REMOVED***
                  >
                    ***REMOVED***status***REMOVED***
                  </Button>
                </Row>
                <div className='mt-4'>
                  <h3>Bio</h3>
                  <hr />
                  <p>***REMOVED***user.bio***REMOVED***</p>
                </div>
                <div className='mt-4'>
                  <h3>Interests</h3>
                  <hr />
                  ***REMOVED***interests.length > 0 ? (
                    <div className='d-flex flex-wrap'>
                      ***REMOVED***interests.map((interest, i) => (
                        <span key=***REMOVED***i***REMOVED*** className='badge bg-secondary me-2 mb-2'>
                          ***REMOVED***interest***REMOVED***
                        </span>
                      ))***REMOVED***
                    </div>
                  ) : (
                    <p>No interests added yet.</p>
                  )***REMOVED***
                </div>
                ***REMOVED***currentUsername === user.username ? (
                  <Button className='mt-3' variant='primary' onClick=***REMOVED***() => setEditing(true)***REMOVED***>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    ***REMOVED***isFriend ? (
                      <Button className='mt-3' variant='primary' onClick=***REMOVED***onDeleteFriend***REMOVED***>
                        Remove Friend
                      </Button>
                    ) : pendingRequest ? (
                      <Button disabled className='mt-3' variant='primary'>
                        Sent Request
                      </Button>
                    ) : (
                      <Button className='mt-3' variant='primary' onClick=***REMOVED***onAddFriend***REMOVED***>
                        Add Friend
                      </Button>
                    )***REMOVED***
                  </>
                )***REMOVED***
              </>
            ) : (
              <>
                <Row>
                  <DropdownButton
                    id='userStatus'
                    title=***REMOVED***status***REMOVED***
                    className='mt-3'
                    defaultValue=***REMOVED***user.status***REMOVED***
                  >
                    <Dropdown.Item onClick=***REMOVED***() => setStatus("Available")***REMOVED***>Available</Dropdown.Item>
                    <Dropdown.Item onClick=***REMOVED***() => setStatus("Busy")***REMOVED***>Busy</Dropdown.Item>
                    <Dropdown.Item onClick=***REMOVED***() => setStatus("Last seen recently")***REMOVED***>
                      Last seen recently
                    </Dropdown.Item>
                    <Dropdown.Item onClick=***REMOVED***() => setStatus("Away")***REMOVED***>Away</Dropdown.Item>
                  </DropdownButton>
                </Row>
                <Form onSubmit=***REMOVED***handleSubmit(onSubmit)***REMOVED*** className='mt-4'>
                  <Form.Group controlId='bio' className='mt-3'>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as='textarea' defaultValue=***REMOVED***user.bio***REMOVED*** ***REMOVED***...register("bio")***REMOVED*** />
                    ***REMOVED***errors.bio && (
                      <>
                        <Form.Text className='text-danger mb-2'>Bio is required</Form.Text>
                        <br />
                      </>
                    )***REMOVED***
                    <Form.Label>Interests</Form.Label>
                    <Select
                      isMulti
                      defaultValue=***REMOVED***INTERESTS.filter(interest =>
                        interests.includes(interest.value)
                      )***REMOVED***
                      name='interests'
                      options=***REMOVED***INTERESTS***REMOVED***
                      className='basic-multi-select'
                      classNamePrefix='select'
                      onChange=***REMOVED***handleInterestChange***REMOVED***
                    />
                  </Form.Group>

                  <Form.Group controlId='photo' className='mt-3'>
                    <Form.Label>Photo url</Form.Label>
                    <Form.Control type='text' defaultValue=***REMOVED***user.photo***REMOVED*** ***REMOVED***...register("photo")***REMOVED*** />
                    ***REMOVED***errors.photo && (
                      <Form.Text className='text-danger'>Photo is required</Form.Text>
                    )***REMOVED***
                  </Form.Group>
                  <Button type='submit' variant='success' className='my-4 me-2'>
                    Save
                  </Button>
                  <Button
                    variant='secondary'
                    className='my-4 ml-2'
                    onClick=***REMOVED***() => setEditing(false)***REMOVED***
                  >
                    Cancel
                  </Button>
                </Form>
              </>
            )***REMOVED***
          </Col>
        </Row>
      </Container>
    );
  ***REMOVED***
***REMOVED***;

export default UserProfile;
