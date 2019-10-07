import React from "react";
import io from "socket.io-client";

export const storeCTX = React.createContext();

let socket;

const initState = {};

function reducer(state, action) {
  const { sender, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { sender, msg }]
      };
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

  React.useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then(res => res.json())
      .then(result => {
        setNewLink(result.rows);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/getChats")
      .then(res => res.json())
      .then(result => {
        dispatch({ type: "FETCH MESSAGE", payload: result.rows });
      })
      .catch(err => alert(err));
  }, []);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE MESSAGE", payload: msg });
    });
  }
  return (
    <storeCTX.Provider value={{ allChats, sendChatAction, newLink }}>
      {props.children}
    </storeCTX.Provider>
  );
};

export default Store;
