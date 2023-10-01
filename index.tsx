import React, { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import List from "./pages/list";
import Detail from "./pages/detail";
import Layout from "./layout";
const searchParams = new URLSearchParams(location.search);
const userId = searchParams.get("userId");

const root = hydrateRoot(
  document,
  <Layout bgColor="white">
    {location.pathname === "/list" ? <List /> : <Detail userId={userId} />}
  </Layout>,
);
