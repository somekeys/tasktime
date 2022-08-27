import { createContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase';

const { nanoid } = require('nanoid');

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  userlogs : [],
  addItemToLogs : () => null,
  isAnonymous : true,
  setIsAnonymous: () =>null,
  username : "",
  setUsername : () => null

});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userlogs, setLogs] = useState([]);
  const [cookies, setCookie] = useCookies(['myid']);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [username, setUsername] = useState("Anonymous");

  console.log("user context")

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("auth state change", user);
      if (user){
      setCurrentUser(user['uid']);
      setIsAnonymous(false);
      setUsername(user['email'])

      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if(isAnonymous){
    if (!cookies.myid) {
      setCookie("myid", nanoid());
    } else {
      console.log("user:" + cookies.myid);
    }
    setCurrentUser(cookies.myid)
  }
  }, [cookies.myid,isAnonymous]);

  useEffect( () => {
   
     if(currentUser){
        fetch(`http://localhost:5000/u/${currentUser}`)
        .then((response) => response.json())
        .then((record) => setLogs(record));
      }else{
        setLogs([]);
      }

  }, [currentUser]);


  const addItemToLogs = (curTask) => {
    console.log("Here we add task:");
    console.log(curTask);
    fetch(`http://localhost:5000/u/${currentUser}/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curTask)
      }).then(res =>
        res.json()
      ).then(htm => {
        setLogs(htm);
      }
      );
      
  };
  const value = { currentUser, setCurrentUser,userlogs,addItemToLogs,isAnonymous,setIsAnonymous,username};

 

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
