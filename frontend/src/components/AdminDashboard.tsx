import ***REMOVED*** User ***REMOVED*** from "../types";
import ***REMOVED*** Dispatch, SetStateAction, useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** Button, Card, Container, Form, ListGroup, Spinner ***REMOVED*** from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Footer from "./Footer";
import Nav from "./Nav";
import ***REMOVED***
  acceptUserRequest,
  changeUserRole,
  deleteUserAccount,
  getAllUsers,
  getPendingRequests,
  rejectUserRequest,
***REMOVED*** from "../api/userApi";
import ErrorToast from "./ErrorToast";

/**
 * AdminDashboard component serves as the main interface for administrators to manage users.
 * It provides functionalities such as viewing all users, managing pending user requests, changing user roles,
 * and deleting user accounts. The component fetches and displays user data using pagination.
 * It also includes an ErrorToast component to display error messages.
 *
 * The component uses React Bootstrap for UI components and react-bootstrap/Pagination for pagination controls.
 * State management is handled with useState for tracking users, pending requests, loading and error states.
 * useEffect is used to fetch user data on component mount or when relevant state changes.
 *
 * @component
 * @param ***REMOVED***Object***REMOVED*** props - The component props.
 * @param ***REMOVED***User***REMOVED*** props.user - The current user object, expected to be an administrator.
 * @param ***REMOVED***Dispatch<SetStateAction<boolean>>***REMOVED*** props.setAuth - Function to update authentication state in the parent component.
 */
const AdminDashboard = (***REMOVED***
  user,
  setAuth,
***REMOVED***: ***REMOVED***
  user: User;
  setAuth: Dispatch<SetStateAction<boolean>>;
***REMOVED***) => ***REMOVED***
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => ***REMOVED***
    const fetchUsers = async () => ***REMOVED***
      if (!user.username) ***REMOVED***
        return;
  ***REMOVED***

      setLoading(true);
      try ***REMOVED***
        const data = await getAllUsers();
        setUsers(data.filter(u => u.username != user.username));

        const requests = await getPendingRequests(user.username);
        setPendingRequests(requests);
  ***REMOVED*** catch (err: any) ***REMOVED***
        setError(err.request.responseText);
  ***REMOVED***

      setLoading(false);
***REMOVED***;

    if (loading) ***REMOVED***
      fetchUsers();
***REMOVED***
***REMOVED*** [user.username, loading]);

  const totalItems = () => ***REMOVED***
    if (pending) ***REMOVED***
      return Math.ceil(pendingRequests.length / 5);
***REMOVED*** else ***REMOVED***
      return Math.ceil(users.length / 5);
***REMOVED***
  ***REMOVED***;

  const startIndex = (currentPage - 1) * 5;
  const endIndexUsers = Math.min(startIndex + 5, users.length);
  const endIndexRequests = Math.min(startIndex + 5, pendingRequests.length);
  const currentUsers = users.slice(startIndex, endIndexUsers);
  const currentRequests = pendingRequests.slice(startIndex, endIndexRequests);
  const totalPages = totalItems();

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) ***REMOVED***
    paginationItems.push(
      <Pagination.Item key=***REMOVED***i***REMOVED*** active=***REMOVED***i === currentPage***REMOVED*** onClick=***REMOVED***() => setCurrentPage(i)***REMOVED***>
        ***REMOVED***i***REMOVED***
      </Pagination.Item>
    );
  ***REMOVED***

  const handleChangeRole = async (currentUser: User) => ***REMOVED***
    if (!currentUser || !currentUser.id || !user.username) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await changeUserRole(currentUser.id, user.username);
      setLoading(true);
      console.log(res);
***REMOVED*** catch (err: any) ***REMOVED***
      setError(err.request.responseText);
***REMOVED***
  ***REMOVED***;

  const handleDeleteAccount = async (id: number | undefined) => ***REMOVED***
    if (!id) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await deleteUserAccount(id);
      setLoading(true);
      console.log(res);
***REMOVED*** catch (err: any) ***REMOVED***
      setError(err.request.responseText);
***REMOVED***
  ***REMOVED***;

  const handleAcceptRequest = async (username: string | undefined) => ***REMOVED***
    if (!username) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await acceptUserRequest(username);
      setLoading(true);
      console.log(res);
***REMOVED*** catch (err: any) ***REMOVED***
      setError(err.request.responseText);
***REMOVED***
  ***REMOVED***;

  const handleRejectRequest = async (username: string | undefined) => ***REMOVED***
    if (!username) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await rejectUserRequest(username);
      setLoading(true);
      console.log(res);
***REMOVED*** catch (err: any) ***REMOVED***
      setError(err.request.responseText);
***REMOVED***
  ***REMOVED***;

  const paginationStyle = ***REMOVED***
    marginTop: "5%",
  ***REMOVED***;

  if (loading) ***REMOVED***
    return <Spinner animation='border' variant='primary' />;
  ***REMOVED*** else ***REMOVED***
    return (
      <div>
        <Nav username=***REMOVED***user.username***REMOVED*** setAuth=***REMOVED***setAuth***REMOVED*** isAdmin=***REMOVED***true***REMOVED*** user=***REMOVED***user***REMOVED*** />
        <Container>
          <Form className='my-4'>
            <Form.Check
              type='switch'
              id='pending'
              label='Pending Requests'
              defaultChecked=***REMOVED***pending***REMOVED***
              onClick=***REMOVED***() => setPending(!pending)***REMOVED***
            />
          </Form>
          ***REMOVED***loading ? (
            <Spinner animation='border' variant='primary' />
          ) : pending ? (
            <>
              <h1 className='display-4 mb-5'>Pending Requests</h1>
              <Card>
                <ListGroup variant='flush'>
                  ***REMOVED***currentRequests.map((user, i) => (
                    <ListGroup.Item key=***REMOVED***i***REMOVED***>
                      <strong>***REMOVED***user.username***REMOVED***</strong>
                      <br />
                      Email: ***REMOVED***user.email***REMOVED***
                      <br />
                      <Button
                        variant='primary'
                        className='mt-2 me-3'
                        onClick=***REMOVED***() => handleAcceptRequest(user.username)***REMOVED***
                      >
                        Accept
                      </Button>
                      <Button
                        variant='danger'
                        className='mt-2'
                        onClick=***REMOVED***() => handleRejectRequest(user.username)***REMOVED***
                      >
                        Reject
                      </Button>
                    </ListGroup.Item>
                  ))***REMOVED***
                </ListGroup>
              </Card>
              ***REMOVED***pendingRequests.length > 0 && (
                <Pagination className='justify-content-center' style=***REMOVED***paginationStyle***REMOVED***>
                  <Pagination.First onClick=***REMOVED***() => setCurrentPage(1)***REMOVED*** />
                  <Pagination.Prev
                    onClick=***REMOVED***() =>
                      currentPage != 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
                ***REMOVED***
                  />
                  ***REMOVED***paginationItems.slice(
                    currentPage > 3 ? currentPage - 3 : 0,
                    currentPage < totalPages - 3 ? currentPage + 2 : totalPages
                  )***REMOVED***
                  <Pagination.Next
                    onClick=***REMOVED***() =>
                      currentPage != totalPages
                        ? setCurrentPage(currentPage + 1)
                        : setCurrentPage(totalPages)
                ***REMOVED***
                  />
                  <Pagination.Last onClick=***REMOVED***() => setCurrentPage(totalPages)***REMOVED*** />
                </Pagination>
              )***REMOVED***
            </>
          ) : (
            <>
              <h1 className='display-4 mb-5'>Users</h1>
              <Card>
                <ListGroup variant='flush'>
                  ***REMOVED***currentUsers.map((user, i) => (
                    <ListGroup.Item key=***REMOVED***i***REMOVED***>
                      <strong>***REMOVED***user.username***REMOVED***</strong>
                      <br />
                      Email: ***REMOVED***user.email***REMOVED***
                      <br />
                      Role: ***REMOVED***user.role***REMOVED***
                      <div className='my-3'>
                        <Button
                          variant='primary'
                          onClick=***REMOVED***() => handleChangeRole(user)***REMOVED***
                          style=***REMOVED******REMOVED*** marginRight: "10px" ***REMOVED******REMOVED***
                        >
                          Change Role
                        </Button>

                        <Button variant='danger' onClick=***REMOVED***() => handleDeleteAccount(user.id)***REMOVED***>
                          Delete Account
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))***REMOVED***
                </ListGroup>
              </Card>
              ***REMOVED***users.length > 0 && (
                <Pagination className='justify-content-center' style=***REMOVED***paginationStyle***REMOVED***>
                  <Pagination.First onClick=***REMOVED***() => setCurrentPage(1)***REMOVED*** />
                  <Pagination.Prev
                    onClick=***REMOVED***() =>
                      currentPage != 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
                ***REMOVED***
                  />
                  ***REMOVED***paginationItems.slice(
                    currentPage > 3 ? currentPage - 3 : 0,
                    currentPage < totalPages - 3 ? currentPage + 2 : totalPages
                  )***REMOVED***
                  <Pagination.Next
                    onClick=***REMOVED***() =>
                      currentPage != totalPages
                        ? setCurrentPage(currentPage + 1)
                        : setCurrentPage(totalPages)
                ***REMOVED***
                  />
                  <Pagination.Last onClick=***REMOVED***() => setCurrentPage(totalPages)***REMOVED*** />
                </Pagination>
              )***REMOVED***
            </>
          )***REMOVED***
        </Container>
        <Footer />
        <ErrorToast title='Error' msg=***REMOVED***error***REMOVED*** show=***REMOVED***show***REMOVED*** setShow=***REMOVED***setShow***REMOVED*** />
      </div>
    );
  ***REMOVED***
***REMOVED***;

export default AdminDashboard;
