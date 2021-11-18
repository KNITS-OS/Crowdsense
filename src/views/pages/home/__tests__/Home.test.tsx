import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HomePage } from "..";

test("renders home page heading", () => {
  render(<HomePage />);
  const headerElement = screen.getByText(/Home Page/i);
  expect(headerElement).toBeInTheDocument();
});
