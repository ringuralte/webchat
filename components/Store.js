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
  const [user, setUser] = React.useState("");

  //topic should not be confused with newLink, newLink fetches data from server
  //while topic is just used for UI stuffs in header component
  const [topic, setTopic] = React.useState("");

  //again get list of groups from server and save it to the unfortunately named newLink state
  React.useEffect(() => {
    const getTopics = async () => {
      const res = await fetch(`${process.env.API_URL}/api/topics`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.code === 200) {
        setNewLink(data.topics);
      }
    };
    getTopics();
  }, []);

  if (!socket) {
    socket = io(`${process.env.API_URL}`);
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
      }}
    >
      {props.children}
    </storeCTX.Provider>
  );
};

export default Store;
