import axios from "axios";
import ***REMOVED*** User ***REMOVED*** from "../types";

export const fetchPosts = async (user: User) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.get(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/posts/$***REMOVED***user.username***REMOVED***`,
      ***REMOVED***
        headers: ***REMOVED***
          "Content-Type": "application/json",
          Authorization: token,
    ***REMOVED***
  ***REMOVED***
    );
    return res.data;
  ***REMOVED*** catch (err) ***REMOVED***
    console.error(err);
  ***REMOVED***
***REMOVED***;

export const createPost = async (user: User, content: string) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.post(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/posts/$***REMOVED***user.username***REMOVED***`,
      ***REMOVED*** content: content ***REMOVED***,
      ***REMOVED***
        headers: ***REMOVED***
          "Content-Type": "application/json",
          Authorization: token,
    ***REMOVED***
  ***REMOVED***
    );
    return res.data;
  ***REMOVED*** catch (err) ***REMOVED***
    console.error(err);
  ***REMOVED***
***REMOVED***;
