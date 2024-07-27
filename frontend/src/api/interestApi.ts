import axios from "axios";
import ***REMOVED*** getUserData ***REMOVED*** from "./userApi";

export const getUsersWithInterest = async (interest: string | undefined) => ***REMOVED***
    const token = sessionStorage.getItem("jwt");
    if (interest === undefined) ***REMOVED***
        return;
***REMOVED***
    try***REMOVED***
        const usersWithInterest = await axios.post(
            `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/interests`, 
***REMOVED***interest],
            ***REMOVED***
                headers: ***REMOVED***
                    "Content-Type": "application/json",
                    Authorization: token,
            ***REMOVED***
        ***REMOVED***
        );
        return usersWithInterest.data;
***REMOVED*** catch (err) ***REMOVED***
        console.error(err);
***REMOVED***
***REMOVED***;

export const countUsersWithInterest = async (interest: string | undefined) => ***REMOVED***
    if (interest === undefined) ***REMOVED***
        return;
***REMOVED***
    try***REMOVED***
        const usersWithInterest = await getUsersWithInterest(interest);
        return usersWithInterest.length;
***REMOVED*** catch (err) ***REMOVED***
        console.error(err);
***REMOVED***
***REMOVED***;

export const checkUserInterest = async (username: string | undefined, interest: string| undefined)=> ***REMOVED***
    if (interest === undefined || username == undefined) ***REMOVED***
        return;
***REMOVED***
    const user = await getUserData(username);
    return user.interests.includes(interest);
***REMOVED***;

