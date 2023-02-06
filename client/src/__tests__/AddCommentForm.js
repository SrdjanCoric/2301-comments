/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCommentForm from "../components/AddCommentForm";

test("contains h2 heading", () => {
  render(<AddCommentForm />);
  const heading = screen.getByRole("heading", {
    level: 2,
    name: "Post a Comment",
  });
  expect(heading).toBeInTheDocument();
});
test("author state changes on input", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  await user.type(inputAuthor, "Srdjan");
  expect(inputAuthor).toHaveValue("Srdjan");
});
test("body state changes on input", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputBody, "Comment");
  expect(inputBody).toHaveValue("Comment");
});
test("onSubmit is called when button is clicked", async () => {
  const func = jest.fn();
  render(<AddCommentForm onSubmit={func} />);
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: "Submit" });
  await user.click(button);
  expect(func.mock.calls.length).toBe(1);
});
test("onSubmit called with the newComment", async () => {
  const func = jest.fn();
  render(<AddCommentForm onSubmit={func} />);
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: "Submit" });
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  await user.type(inputAuthor, "Srdjan");
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputBody, "Comment");
  const newComment = { author: inputAuthor.value, body: inputBody.value };
  await user.click(button);
  expect(func.mock.calls[0][0]).toEqual(newComment);
});
