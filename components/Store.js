import React from "react";
import io from "socket.io-client";

export const storeCTX = React.createContext();

const initState = {
  chats: [
    { sender: "meone", msg: "store message from meone" },
    { sender: "metwo", msg: "switched to a store style" },
    { sender: "meone", msg: "i hope it works though" }
  ]
};

const links = {
  links: [{ heading: "SignIn", href: "/signin" }]
};

let socket;

function reducer(state, action) {
  const { sender, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { sender, msg }]
      };
    default:
      return state;
  }
}

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = (props) => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE MESSAGE", payload: msg });
    });
  }
  return (
    <storeCTX.Provider value={{ allChats, sendChatAction, links }}>
      {props.children}
    </storeCTX.Provider>
  );
};

export default Store;