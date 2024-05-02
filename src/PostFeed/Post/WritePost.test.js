import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import WritePost from "./WritePost";

// Mocking the setPostsList function
const setPostsListMock = jest.fn();

describe("WritePost component", () => {
  it("should render the component", () => {
    render(<WritePost postsList={[]} setPostsList={setPostsListMock} />);
    expect(screen.getByText("Upload A Post")).toBeInTheDocument();
  });

  it("should update postInput state when text is typed in the input field", () => {
    render(<WritePost postsList={[]} setPostsList={setPostsListMock} />);
    const input = screen.getByPlaceholderText("Write about something !");
    fireEvent.change(input, { target: { value: "Test post" } });
    expect(input.value).toBe("Test post");
  });

  

 
});
