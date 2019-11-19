import React from "react";
import io from "socket.io-client";

export const storeCTX = React.createContext();

let socket;

const initState = {};

function reducer(state, action) {
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

// function topicReducer(state, action) {
//   switch (action.type) {
//     case "CHANGE TOPIC":
//       return action.payload;
//     default:
//       return state;
//   }
// }

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [newLink, setNewLink] = React.useState({});
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  const [user, setUser] = React.useState("");

  // const [topic, dispatchTopic] = React.useReducer(topicReducer, "")
  //topic should not be confused with newLink, newLink fetches data from server
  //while topic is just used for UI stuffs in header component
  const [topic, setTopic] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:5000/api/topics", { credentials: "include" })
      .then(res => res.json())
      .then(json => {
        setNewLink(json.rows);
      });
  }, []);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
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
        user,
        setUser,
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
