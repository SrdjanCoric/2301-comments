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
