import { fireEvent, render, screen } from "@testing-library/react";

import Error from "../Error";

describe("Error", () => {
  const defaultProps = {
    message: "Test error message",
    onRetry: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error message", () => {
    render(<Error {...defaultProps} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    render(<Error {...defaultProps} />);
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<Error message="Test error message" />);
    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    render(<Error {...defaultProps} />);
    
    const retryButton = screen.getByText("Try Again");
    fireEvent.click(retryButton);
    
    expect(defaultProps.onRetry).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Error {...defaultProps} className="custom-error" />);
    const container = screen.getByText("Error").parentElement;
    expect(container).toHaveClass("custom-error");
  });

  it("renders warning icon", () => {
    render(<Error {...defaultProps} />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("fill", "none");
    expect(icon).toHaveAttribute("stroke", "currentColor");
  });
}); 