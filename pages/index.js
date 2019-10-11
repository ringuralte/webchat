import React from "react";
import Router from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import { storeCTX } from "../components/Store";

import fetch from "isomorphic-unfetch";

const Rooms = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Home = () => {
  const { allChats } = React.useContext(storeCTX);

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
        <Rooms title="rooms" />
      </Layout>
    </React.Fragment>
  );
};

export default Home;
