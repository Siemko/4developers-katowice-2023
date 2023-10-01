import React, { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import List from "./pages/list";
import Detail from "./pages/detail";

const searchParams = new URLSearchParams(location.search);
const userId = searchParams.get("userId");

const Layout = ({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor: string;
}) => {
  return (
    <body>
      <nav>
        <a href="/list?test">React Server Components :)</a>
      </nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: bgColor,
          color: bgColor === "black" ? "white" : "black",
          transition: "all .3s ease",
        }}
      >
        {children}
      </div>
    </body>
  );
};

const root = hydrateRoot(
  document,
  <Layout bgColor="white">
    {location.pathname === "/list" ? <List /> : <Detail userId={userId} />}
  </Layout>,
);
