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
  const reactTree = await createTree(
    <Layout bgColor={req.params.path === "list" ? "white" : "black"}>
      <Component {...req.query} />
    </Layout>
  );

  if (req.query.jsx === "") {
    res.end(JSON.stringify(reactTree, escapeJsx));
    return;
  }

  const html = `${renderToString(reactTree)}
  <script>
  window.__initialMarkup=\`${JSON.stringify(reactTree, escapeJsx)}\`;
  </script>
  <script src="/client.js" type="module"></script>`;
  console.dir(await createTree(<Component />), { depth: null });
  res.end(html);
});

const createTree = async (jsx) => {
  if (!jsx) {
    return;
  }

  if (["string", "number", "boolean"].includes(typeof jsx)) {
    return jsx;
  }

  if (Array.isArray(jsx)) {
    return await Promise.all(jsx.map(createTree));
  }

  if (typeof jsx === "object" && jsx !== null) {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        return { ...jsx, props: await createTree(jsx.props) };
      }

      if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const renderedComponent = await Component(props);
        return await createTree(renderedComponent);
      }
    }

    return Object.fromEntries(
      await Promise.all(
        Object.entries(jsx).map(async ([key, value]) => [
          key,
          await createTree(value),
        ]),
      ),
    );
  }
};

const escapeJsx = (key, value) => {
  if (value === Symbol.for("react.element")) {
    return "$";
  }
  return value;
};

app.listen(3000, () => {
  console.log("Listening on 3000!");
});
