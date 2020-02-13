import React from "react";
import io from "socket.io-client";

export const storeCTX = React.createContext();

let socket;

const initState = {};

function reducer(state, action) {
  //might not be the right way for react
  const prevState = { ...state };
  const length = Object.keys(prevState).length;
  prevState[length + 1] = action.payload;
  switch (action.type) {
    case "RECEIVE MESSAGE":
      return prevState;
    case "FETCH MESSAGE":
      return action.payload;
    default:
      return state;
  }
}

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [newLink, setNewLink] = React.useState({});
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  // const [user, setUser] = React.useState("");

  // const [topic, dispatchTopic] = React.useReducer(topicReducer, "")
  //topic should not be confused with newLink, newLink fetches data from server
  //while topic is just used for UI stuffs in header component
  const [topic, setTopic] = React.useState("");

  React.useEffect(() => {
    // fetch("http://localhost:5000/api/topics", { credentials: "include" })
    fetch("https://fast-oasis-98847.herokuapp.com/api/topics", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 200) {
          setNewLink(json.topics);
        }
      });
  }, []);

  if (!socket) {
    socket = io("https://fast-oasis-98847.herokuapp.com");
    socket.on("chat message", function(msg) {
      console.log(msg);
      dispatch({ type: "RECEIVE MESSAGE", payload: msg });
    });
  }
  return (
    <storeCTX.Provider
      value={{
        allChats,
        dispatch,
        sendChatAction,
        newLink,
        // user,
        // setUser,
        topic,
        setTopic
        // dispatchTopic
      }}
    >
      {props.children}
    </storeCTX.Provider>
  );
};

export default Store;
