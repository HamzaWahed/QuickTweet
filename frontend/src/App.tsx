import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** Route, BrowserRouter as Router, Routes ***REMOVED*** from "react-router-dom";
import ***REMOVED*** getUserData ***REMOVED*** from "./api/userApi";
import AdminDashboard from "./components/AdminDashboard";
import Feed from "./components/Feed";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import GroupPage from "./components/GroupPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserLoginPage from "./components/UserLoginPage";
import UserProfile from "./components/UserProfile";
import ***REMOVED*** INTERESTS ***REMOVED*** from "./constants";
import ***REMOVED*** User, initialUser ***REMOVED*** from "./types";

const App = () => ***REMOVED***
  const [isAuthenticated, setAuth] = useState(false);
  const [user, setUser] = useState<User>(initialUser);

  const loggedInUserJSON: string | null = sessionStorage.getItem("user");
  useEffect(() => ***REMOVED***
    const fetchData = async (username: string | undefined) => ***REMOVED***
      const userData = await getUserData(username);
      setUser(userData);
      setAuth(true);
***REMOVED***;

    if (loggedInUserJSON != null) ***REMOVED***
      const loggedInUser = JSON.parse(loggedInUserJSON);
      fetchData(loggedInUser.username);
***REMOVED***
***REMOVED*** [loggedInUserJSON]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element=***REMOVED***
            isAuthenticated && user.role ? (
              <Feed user=***REMOVED***user***REMOVED*** setAuth=***REMOVED***setAuth***REMOVED*** />
            ) : (
              <UserLoginPage Form=***REMOVED***LoginForm***REMOVED*** formComponents=***REMOVED******REMOVED*** setAuth, user, setUser ***REMOVED******REMOVED*** />
            )
      ***REMOVED***
        />
        <Route
          path='/register'
          element=***REMOVED***
            <UserLoginPage Form=***REMOVED***RegisterForm***REMOVED*** formComponents=***REMOVED******REMOVED*** setAuth, user, setUser ***REMOVED******REMOVED*** />
      ***REMOVED***
        />
        <Route
          path='/forgotpassword'
          element=***REMOVED***
            <UserLoginPage Form=***REMOVED***ForgotPasswordForm***REMOVED*** formComponents=***REMOVED******REMOVED*** setAuth, user, setUser ***REMOVED******REMOVED*** />
      ***REMOVED***
        />
        <Route
          path='/profile/:username'
          element=***REMOVED***
            isAuthenticated ? (
              <UserProfile currentUsername=***REMOVED***user.username***REMOVED*** />
            ) : (
              <UserLoginPage Form=***REMOVED***LoginForm***REMOVED*** formComponents=***REMOVED******REMOVED*** setAuth, user, setUser ***REMOVED******REMOVED*** />
            )
      ***REMOVED***
        />
        <Route
          path='/admin'
          element=***REMOVED***
            user.role === "ADMIN" ? (
              <AdminDashboard user=***REMOVED***user***REMOVED*** setAuth=***REMOVED***setAuth***REMOVED*** />
            ) : (
              <h1>User not authorized to access this page.</h1>
            )
      ***REMOVED***
        />
        ***REMOVED***INTERESTS.map((***REMOVED*** value ***REMOVED***) => (
          <Route
            key=***REMOVED***value***REMOVED***
            path=***REMOVED***`/groups/$***REMOVED***value***REMOVED***`***REMOVED***
            element=***REMOVED***<GroupPage user=***REMOVED***user***REMOVED*** interest=***REMOVED***value***REMOVED*** />***REMOVED***
          />
        ))***REMOVED***
        <Route path='*' element=***REMOVED***<h1>Page not found</h1>***REMOVED*** />
      </Routes>
    </Router>
  );
***REMOVED***;

export default App;
