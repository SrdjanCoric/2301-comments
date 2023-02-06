/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CommentThread from "../components/CommentThread";
import { getReplies } from "../services/comment";
import userEvent from "@testing-library/user-event";
jest.mock("../services/comment");

const setup = () => {
  const comment = {
    id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Reed Fisher",
    body: "Sint in in sunt amet.",
    postedAt: 1550488214207,
    replies_count: 3,
    replies: [
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Kathleen Nikolaus",
        body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941546,
      },
    ],
  };

  const comments = [
    {
      id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Reed Fisher",
      body: "Sint in in sunt amet.",
      postedAt: 1550488214207,
      replies_count: 3,
      replies: [
        {
          id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
          comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
          author: "Kathleen Nikolaus",
          body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
          postedAt: 1550419941546,
        },
      ],
    },
  ];
  const user = userEvent.setup();
  const setComments = jest.fn();
  render(
    <CommentThread
      comment={comment}
      comments={comments}
      setComments={setComments}
    />
  );
  return {
    user,
    setComments,
    comment,
  };
};

const repliesFromServer = [
  {
    id: "80ed5281-7fc7-4386-b98d-355907e6e0c1",
    comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Vivian Adams",
    body: "Maxime iusto quos architecto. Voluptate consequatur porro nam tenetur voluptatem amet et esse. Natus culpa eius et sunt soluta est autem. Officia aliquid saepe. Ullam accusantium explicabo perferendis reiciendis sunt. Porro et necessitatibus.",
    postedAt: 1550486931293,
  },
  {
    id: "80ed5281-7fc7-4386-b98d-355907e6e0c8",
    comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Vivian Adams",
    body: "Maxime iusto quos architecto. Voluptate consequatur porro nam tenetur voluptatem amet et esse. Natus culpa eius et sunt soluta est autem. Officia aliquid saepe. Ullam accusantium explicabo perferendis reiciendis sunt. Porro et necessitatibus.",
    postedAt: 1550486931293,
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

test("link is shown on the page", () => {
  setup();
  const link = screen.getByRole("link");
  expect(link).toBeInTheDocument();
});

test("getReplies is called when the link is clicked", async () => {
  const { user } = setup();
  const link = screen.getByRole("link");
  await user.click(link);
  expect(getReplies).toHaveBeenCalledTimes(1);
});

test("getReplies is called with the comment id passed to it", async () => {
  const { user, comment } = setup();
  const link = screen.getByRole("link");
  await user.click(link);
  expect(getReplies).toHaveBeenCalledWith(comment.id);
});

test("setComments was called when the button was clicked", async () => {
  const { user, setComments } = setup();
  const link = screen.getByRole("link");
  await user.click(link);
  expect(setComments.mock.calls.length).toBe(1);
});

test("setComments is called with the comment that has all replies", async () => {
  const { user, setComments, comment } = setup();
  const link = screen.getByRole("link");

  getReplies.mockResolvedValueOnce(repliesFromServer);

  await user.click(link);

  const newComments = setComments.mock.calls[0][0];
  const newComment = newComments.find((c) => c.id === comment.id);
  expect(newComment.replies.length).toBe(comment.replies_count);
});

// func.mock.calls = [[comments]]
