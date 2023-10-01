import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { join } from "path";
import Layout from "./layout";

const app = express();

app.use(express.static("./dist"));

app.get("/:path", async (req, res) => {
  if (!["list", "detail"].includes(req.params.path)) {
    return res.end();
  }
  const page = await import(
    join(process.cwd(), "dist", "pages", req.params.path)
  );
  const Component = page.default;
  const html = renderToString(
    <Layout bgColor="white">
      <Component />
      <script src="/client.js"></script>
    </Layout>,
  );
  res.end(html);
});

app.listen(3000, () => {
  console.log("Listening on 3000!");
});
