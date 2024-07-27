import ***REMOVED*** Dispatch, FC, SetStateAction ***REMOVED*** from "react";
import ***REMOVED*** NavigateFunction ***REMOVED*** from "react-router";


export interface User ***REMOVED***
  id?: number;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  bio: string | undefined;
  role: string | undefined;
  photo: string | undefined;
  status: string | undefined;
  friends: User[] | undefined;
  friendRequests: User[];
  interests: string[] | undefined;
***REMOVED***

export interface SearchResult ***REMOVED***
  value: string;
  label: string;
  path: string;
***REMOVED***

export const initialUser: User = ***REMOVED***
  username: "",
  email: "",
  password: "",
  bio: "",
  role: "",
  photo: "",
  status: "",
  friends: [],
  friendRequests: [],
  interests: [],
***REMOVED***;

export interface Interest ***REMOVED***
  id: number;
  title: string;
  users: User[];
***REMOVED***

export interface Post ***REMOVED***
  id: number;
  content: string;
  createdDate: Date;
  user: User;
***REMOVED***

export interface Group ***REMOVED***
  id: number;
  name: string;
  members: User[];
***REMOVED***

export interface LoginFormProps ***REMOVED***
  setAuth: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
***REMOVED***

export interface FormComponents ***REMOVED***
  setAuth: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
***REMOVED***

export interface FormProps ***REMOVED***
  Form: FC<FormComponents>;
  formComponents: FormComponents;
***REMOVED***

export interface UsernameFormProps ***REMOVED***
  navigate: NavigateFunction;
  setUsername: Dispatch<SetStateAction<string>>;
  setSecurityQuestion: Dispatch<SetStateAction<string>>;
  setErr: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
***REMOVED***

export interface NavBarProps ***REMOVED***
  username: string | undefined;
  setAuth: Dispatch<SetStateAction<boolean>>;
  isAdmin?: boolean;
  user?: User;
***REMOVED***

export interface PostFormProps ***REMOVED***
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  user: User;
  setLoading: Dispatch<SetStateAction<boolean>>;
***REMOVED***

export interface FilterProps ***REMOVED***
  posts: Post[]; 
  setPosts: Dispatch<SetStateAction<Post[]>>;
***REMOVED***

export interface UserData ***REMOVED***
  username: string;
  bio: string | undefined;
  status: string | undefined;
  photo: string | undefined;
  interests: string[] | undefined;
***REMOVED***

export interface UserProfileProps ***REMOVED***
  currentUsername: string | undefined;
***REMOVED***

export interface FeedProps ***REMOVED***
  user: User;
  setAuth: Dispatch<SetStateAction<boolean>>;
***REMOVED***

export interface GroupPageProps ***REMOVED***
  user: User;
  interest: string | undefined;
***REMOVED***
