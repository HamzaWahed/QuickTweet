import axios from "axios";

export const updateStatus = async (
  username: string | undefined,
  status: string
) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.put(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/status/$***REMOVED***username***REMOVED***`,
      status,
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
