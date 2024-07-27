import ***REMOVED*** faFilter, faPencil ***REMOVED*** from "@fortawesome/free-solid-svg-icons";
import ***REMOVED*** FontAwesomeIcon ***REMOVED*** from "@fortawesome/react-fontawesome";
import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** Button, Col, Container, Row, Spinner ***REMOVED*** from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import ***REMOVED*** fetchPosts ***REMOVED*** from "../api/postApi";
import ***REMOVED*** FeedProps, Post as PostInterface ***REMOVED*** from "../types";
import Footer from "./Footer";
import Nav from "./Nav";
import Post from "./Post";
import PostForm from "./PostForm";
import Filters from "./Filters";
import FriendRecommendations from "./RecommendFriends";

/**
 * Feed component that displays posts and allows users to create new posts.
 * It fetches posts asynchronously when the component mounts or when the `user` prop changes.
 * It supports pagination, displaying a fixed number of posts per page and generating pagination controls dynamically.
 * A modal can be toggled to display or hide additional UI elements, such as a form for creating a new post.
 *
 * @component
 * @param ***REMOVED***Object***REMOVED*** props - The component props.
 * @param ***REMOVED***Object***REMOVED*** props.user - The current user object. Used to fetch posts related to the user.
 * @param ***REMOVED***Function***REMOVED*** props.setAuth - Function to update authentication state in the parent component.
 * @returns ***REMOVED***React.ReactElement***REMOVED*** The Feed component.
 */
const Feed = (***REMOVED*** user, setAuth ***REMOVED***: FeedProps): React.ReactElement => ***REMOVED***
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(posts.length / 5);

  useEffect(() => ***REMOVED***
    const fetchData = async () => ***REMOVED***
      setLoading(true);
      const data = await fetchPosts(user);
      setPosts(data);
      setLoading(false);
***REMOVED***;

    if (loading) ***REMOVED***
      fetchData();
***REMOVED***
***REMOVED*** [user.username, loading]);

  const toggleDropdown = () => ***REMOVED***
    setShowDropdown(prev => !prev);
  ***REMOVED***;

  // calculate starting and ending index of current page (assuming posts are inserted as an array)
  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, posts.length);

  // use these indices to determine which posts exist in currently visited page
  const currentPosts = posts.slice(startIndex, endIndex);

  // generate a new page 'button' for each new page
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) ***REMOVED***
    paginationItems.push(
      <Pagination.Item key=***REMOVED***i***REMOVED*** active=***REMOVED***i === currentPage***REMOVED*** onClick=***REMOVED***() => setCurrentPage(i)***REMOVED***>
        ***REMOVED***i***REMOVED***
      </Pagination.Item>
    );
  ***REMOVED***

  const paginationStyle = ***REMOVED***
    marginTop: "5%",
  ***REMOVED***;

  if (loading) ***REMOVED***
    return <Spinner animation='border' variant='primary' />;
  ***REMOVED*** else ***REMOVED***
    return (
      <div>
        <Nav
          username=***REMOVED***user.username***REMOVED***
          setAuth=***REMOVED***setAuth***REMOVED***
          isAdmin=***REMOVED***user.role === "ADMIN"***REMOVED***
          user=***REMOVED***user***REMOVED***
        />
        <Container fluid>
          ***REMOVED***loading ? (
            <Spinner animation='border' variant='primary' />
          ) : (
            <>
              <Row className='my-4 justify-content-end'>
                <Col className='col-1'>
                  <Button onClick=***REMOVED***() => setModal(true)***REMOVED***>
                    <FontAwesomeIcon icon=***REMOVED***faPencil***REMOVED*** />
                  </Button>
                </Col>
                <Col className='col-2'>
                  <Button onClick=***REMOVED***toggleDropdown***REMOVED***>
                    <FontAwesomeIcon icon=***REMOVED***faFilter***REMOVED*** />
                  </Button>
                  ***REMOVED***showDropdown && <Filters posts=***REMOVED***posts***REMOVED*** setPosts=***REMOVED***setPosts***REMOVED***></Filters>***REMOVED***
                </Col>
              </Row>
              <PostForm modal=***REMOVED***modal***REMOVED*** setModal=***REMOVED***setModal***REMOVED*** user=***REMOVED***user***REMOVED*** setLoading=***REMOVED***setLoading***REMOVED*** />
              ***REMOVED***currentPosts.map((post, i) => (
                <Post post=***REMOVED***post***REMOVED*** key=***REMOVED***i***REMOVED*** />
              ))***REMOVED***
              ***REMOVED***posts.length > 0 && (
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
          <FriendRecommendations currentUsername=***REMOVED***user.username***REMOVED*** />
        </Container>
        <Footer />
      </div>
    );
  ***REMOVED***
***REMOVED***;

export default Feed;
