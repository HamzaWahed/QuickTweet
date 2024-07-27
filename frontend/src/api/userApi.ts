import axios from "axios";
import ***REMOVED*** User, UserData ***REMOVED*** from "../types";

export const getAllUsers = async (): Promise<User[]> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users`, ***REMOVED***
    headers: ***REMOVED***
      "Content-Type": "application/json",
      Authorization: token,
***REMOVED***
  ***REMOVED***);
  return response.data as User[];
***REMOVED***;

export const getUserData = async (username: string | undefined) => ***REMOVED***
  if (username === undefined) ***REMOVED***
    return;
  ***REMOVED***

  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.get(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/username/$***REMOVED***username***REMOVED***`, ***REMOVED***
      headers: ***REMOVED***
        "Content-Type": "application/json",
        Authorization: token,
  ***REMOVED***
***REMOVED***);
    return res.data;
  ***REMOVED*** catch (err) ***REMOVED***
    console.error(err);
  ***REMOVED***
***REMOVED***;

export const postUserData = async (userObj: UserData | User, username: string | undefined) => ***REMOVED***
  if (username === undefined) ***REMOVED***
    return;
  ***REMOVED***

  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.put(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/$***REMOVED***username***REMOVED***`, userObj, ***REMOVED***
      headers: ***REMOVED***
        "Content-Type": "application/json",
        Authorization: token,
  ***REMOVED***
***REMOVED***);

    return res.data;
  ***REMOVED*** catch (err) ***REMOVED***
    console.error(err);
  ***REMOVED***
***REMOVED***;

export const getFriendRequests = async (username: string | undefined) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.get(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/friends/requests/$***REMOVED***username***REMOVED***`,
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

export const getFriends = async (username: string | undefined) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.get(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/friends/$***REMOVED***username***REMOVED***`, ***REMOVED***
      headers: ***REMOVED***
        "Content-Type": "application/json",
        Authorization: token,
  ***REMOVED***
***REMOVED***);
    return res.data;
  ***REMOVED*** catch (err) ***REMOVED***
    console.error(err);
  ***REMOVED***
***REMOVED***;

export const addFriendRequest = async (
  username: string | undefined,
  friendUsername: string | undefined
) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.put(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/friends/requests/$***REMOVED***username***REMOVED***`,
      friendUsername,
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

export const addFriend = async (
  username: string | undefined,
  friendUsername: string | undefined
) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.put(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/friends/$***REMOVED***username***REMOVED***`,
      friendUsername,
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

export const deleteFriend = async (
  username: string | undefined,
  friendUsername: string | undefined
) => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const res = await axios.post(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/friends/$***REMOVED***username***REMOVED***`,
      friendUsername,
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

export const createUserRequest = async (user: any) => ***REMOVED***
  const res = await axios.post(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users`, user, ***REMOVED***
    headers: ***REMOVED*** "Content-Type": "application/json" ***REMOVED***,
  ***REMOVED***);
  return res.data;
***REMOVED***;

export const getPendingRequests = async (username: string): Promise<User[]> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const res = await axios.get(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/admin/requests/$***REMOVED***username***REMOVED***`, ***REMOVED***
    headers: ***REMOVED*** "Content-Type": "application/json", Authorization: token ***REMOVED***,
  ***REMOVED***);
  return res.data as User[];
***REMOVED***;

export const deleteUserAccount = async (id: number): Promise<User> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const res = await axios.delete(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/$***REMOVED***id***REMOVED***`, ***REMOVED***
    headers: ***REMOVED*** "Content-Type": "application/json", Authorization: token ***REMOVED***,
  ***REMOVED***);
  return res.data;
***REMOVED***;

export const acceptUserRequest = async (username: string): Promise<string> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const res = await axios.put(
    `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/admin/requests/$***REMOVED***username***REMOVED***`,
    ***REMOVED******REMOVED***,
    ***REMOVED***
      headers: ***REMOVED*** "Content-Type": "application/json", Authorization: token ***REMOVED***,
***REMOVED***
  );
  return res.data;
***REMOVED***;

export const rejectUserRequest = async (username: string): Promise<string> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const res = await axios.delete(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/admin/requests/$***REMOVED***username***REMOVED***`, ***REMOVED***
    headers: ***REMOVED*** "Content-Type": "application/json", Authorization: token ***REMOVED***,
  ***REMOVED***);

  return res.data;
***REMOVED***;

export const changeUserRole = async (id: number, adminUsername: string): Promise<string> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  const res = await axios.put(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/admin/users/$***REMOVED***id***REMOVED***`, adminUsername, ***REMOVED***
    headers: ***REMOVED*** "Content-Type": "application/json", Authorization: token ***REMOVED***,
  ***REMOVED***);

  return res.data;
***REMOVED***;

export const getSecurityQuestion = async (username: string) => ***REMOVED***
  const res = await axios.get(`$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/forgotPassword/$***REMOVED***username***REMOVED***`);
  return res.data;
***REMOVED***;

export const updatePassword = async (
  username: string,
  ***REMOVED*** password, answer ***REMOVED***: ***REMOVED*** password: string; answer: string ***REMOVED***
) => ***REMOVED***
  const res = await axios.post(
    `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/forgotPassword/$***REMOVED***username***REMOVED***`,
    ***REMOVED*** password, answer ***REMOVED***,
    ***REMOVED***
      headers: ***REMOVED*** "Content-Type": "application/json" ***REMOVED***,
***REMOVED***
  );
  return res.data;
***REMOVED***;

export const searchUsers = async (query: string): Promise<User[]> => ***REMOVED***
  const token = sessionStorage.getItem("jwt");
  try ***REMOVED***
    const response = await axios.get(
      `$***REMOVED***import.meta.env.VITE_API_URL***REMOVED***/users/search?query=$***REMOVED***query***REMOVED***`,
      ***REMOVED***
        headers: ***REMOVED***
          "Content-Type": "application/json",
          Authorization: token,
    ***REMOVED***
  ***REMOVED***
    );
    return response.data;
  ***REMOVED*** catch (error) ***REMOVED***
    console.error("Error searching users:", error);
    return [];
  ***REMOVED***
***REMOVED***;
