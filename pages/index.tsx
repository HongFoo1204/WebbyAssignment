//type
import { NextPage } from "next/types";
import { ReactElement } from "react";
//library
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

//components
import { useAuth } from "../components/AuthContext";
import BlogList from "../components/BlogList";

const Home: NextPage = (): ReactElement => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Webby Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <BlogList />}
    </>
  );
};

export default Home;
