import React from "react";
import ReactDOM from "react-dom/client";

const Comment = ({ author, body, postedAt }) => {
  return React.createElement("div", {
    className: "comment",
    children: [
      React.createElement("hr"),
      React.createElement(
        "div",
        { className: "image" },
        React.createElement("img", {
          src: "https://i.postimg.cc/Y0RcrdHp/no-user-image.gif",
        })
      ),
      React.createElement("div", {
        className: "header",
        children: [
          React.createElement("h3", { className: "author" }, author),
          React.createElement("span", null, postedAt),
        ],
      }),
      React.createElement("p", null, body),
    ],
  });
};

const Popover = ({ children }) => {
  return children;
};

const App = () => {
  const h2 = React.createElement("h2", null, "My Comments(2)");

  return React.createElement(
    "div",
    null,
    React.createElement("div", {
      className: "comments",
      children: [
        React.createElement(
          Popover,
          null,
          React.createElement("h1", null, "My Popover")
        ),
        h2,
        React.createElement("div", {
          className: "parent-comment",
          children: [
            React.createElement(Comment, {
              author: "Srdjan",
              postedAt: "1 min ago",
              body: "Pretty lucky today",
            }),
            React.createElement(Comment, {
              author: "Max",
              postedAt: "2mins ago",
              body: "Making sure Srdjan doesn't mess up",
            }),
            React.createElement(Comment, {
              author: "Rodney",
              postedAt: "3 mins ago",
              body: "Srdjan's the best!",
            }),
          ],
        }),
        React.createElement(Popover, null, [
          React.createElement("h1", null, "Another Popover"),
          React.createElement("h1", null, "Third one Popover"),
        ]),
      ],
    })
  );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(App());
