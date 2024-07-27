import ***REMOVED*** Dispatch, SetStateAction, useRef, useState ***REMOVED*** from "react";
import ***REMOVED*** FilterProps, Post as PostInterface ***REMOVED*** from "../types";

function useInitialValue(value: PostInterface[]): PostInterface[] ***REMOVED***
  const initialValueRef = useRef<PostInterface[]>(value);

  // Return the stored initial value
  return initialValueRef.current;
***REMOVED***

const Filters = (***REMOVED*** posts, setPosts ***REMOVED***: FilterProps): React.ReactElement => ***REMOVED***
  const [textInp, setText] = useState("");
  const [userInp, setUser] = useState("");
  const [interestInp, setInterest] = useState("");
  const initialPosts = useInitialValue(posts);

  const filter = (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    user: string,
    interestSearch: string,
    setPosts: Dispatch<SetStateAction<PostInterface[]>>
  ) => ***REMOVED***
    e.preventDefault();

    // partial search for posts using the specified content string, username and/or interests
    let postTemp: PostInterface[];
    postTemp = initialPosts.filter(post => post.content.toLowerCase().includes(text.toLowerCase()));
    postTemp = postTemp.filter(post => ***REMOVED***
      if (post.user.username == undefined) ***REMOVED***
        return false;
  ***REMOVED***

      return post.user.username.toLowerCase().includes(user.toLowerCase());
***REMOVED***);
    postTemp = postTemp.filter(post =>
      post.user.interests?.some(interest =>
        interest.toLowerCase().includes(interestSearch.toLowerCase())
      )
    );

    setPosts(postTemp);
  ***REMOVED***;

  return (
    <form
      style=***REMOVED***styles.container***REMOVED***
      onSubmit=***REMOVED***e => filter(e, textInp, userInp, interestInp, setPosts)***REMOVED***
    >
      <div style=***REMOVED***styles.item***REMOVED***>
        <label>
          <p>Post Contains:</p>
          <input type='text' id='text' value=***REMOVED***textInp***REMOVED*** onChange=***REMOVED***e => setText(e.target.value)***REMOVED*** />
        </label>
      </div>
      <div style=***REMOVED***styles.item***REMOVED***>
        <label>
          <p>Username:</p>
          <input type='text' id='user' value=***REMOVED***userInp***REMOVED*** onChange=***REMOVED***e => setUser(e.target.value)***REMOVED*** />
        </label>
      </div>
      <div style=***REMOVED***styles.item***REMOVED***>
        <label>
          <p> User Interests:</p>
          <input
            type='text'
            id='interest'
            value=***REMOVED***interestInp***REMOVED***
            onChange=***REMOVED***e => setInterest(e.target.value)***REMOVED***
          ></input>
        </label>
      </div>
      <div style=***REMOVED***styles.item***REMOVED***>
        <input style=***REMOVED***styles.submit***REMOVED*** type='submit' value='Submit'></input>
      </div>
    </form>
  );
***REMOVED***;

const styles: ***REMOVED***
  container: React.CSSProperties;
  item: React.CSSProperties;
  submit: React.CSSProperties;
***REMOVED*** = ***REMOVED***
  container: ***REMOVED***
    display: "flex",
    justifyContent: "space-between", // Distribute items evenly
    alignItems: "center", // Align items vertically centered
    padding: "10px",
    backgroundColor: "#0d6efd",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
    position: "fixed",
    top: "0", // adjust based on where you want it
    left: "0",
    right: "0",
    margin: "0 auto",
***REMOVED***
  item: ***REMOVED***
    color: "white",
    flex: "1 1 0", // Allow items to grow and shrink equally
    textAlign: "center",
    padding: "10px",
    margin: "5px",
***REMOVED***
  submit: ***REMOVED***
    color: "#0d6efd",
    backgroundColor: "white",
    border: "6px double #0d6efd",
***REMOVED***
***REMOVED***;

export default Filters;
