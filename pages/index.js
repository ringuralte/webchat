import React from "react";
import Router from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import fetch from "isomorphic-unfetch";

const Home = () => {
  const { newLink, setTopic } = React.useContext(storeCTX);

  React.useEffect(() => {
    fetch("http://localhost:5000/checkToken", { credentials: "include" })
      .then(res => res.json())
      .then(result => {
        if (result.code !== 200) Router.push("/signin");
      });
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <List>
          {Object.keys(newLink).map(key => (
            <ListItem
              button
              key={key}
              onClick={() => {
                setTopic(newLink[key]);
              }}
            >
              <Link href="/p/[id]" as={`/p/${newLink[key].title}`}>
                <ListItemText primary={newLink[key].title} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
