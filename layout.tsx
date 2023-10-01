import React, { ReactNode } from "react";

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

export default Layout;
