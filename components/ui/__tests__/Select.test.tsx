import { fireEvent, render, screen } from "@testing-library/react";

import { Select } from "../Select";

describe("Select", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const defaultProps = {
    onChange: jest.fn(),
    options,
    value: "1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial value", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<Select {...defaultProps} />);
    
    const select = screen.getByText("Option 1");
    fireEvent.click(select);
    
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("handles single selection", () => {
    render(<Select {...defaultProps} />);
    
    // Open dropdown
    fireEvent.click(screen.getByText("Option 1"));
    
    // Select new option
    fireEvent.click(screen.getByText("Option 2"));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("2");
  });

  it("handles multi selection", () => {
    render(
      <Select
        {...defaultProps}
        isMulti
        onChange={(value) => defaultProps.onChange(value)}
        value={["1"]}
      />
    );
    
    // Open dropdown
    fireEvent.click(screen.getByText("1 selected"));
    
    // Select additional option
    fireEvent.click(screen.getByText("Option 2"));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(["1", "2"]);
  });

  it("handles deselection in multi mode", () => {
    render(
      <Select
        {...defaultProps}
        isMulti
        onChange={(value) => defaultProps.onChange(value)}
        value={["1", "2"]}
      />
    );
    
    // Open dropdown
    fireEvent.click(screen.getByText("2 selected"));
    
    // Deselect option
    fireEvent.click(screen.getByText("Option 1"));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(["2"]);
  });

  it("closes dropdown when clicking outside", () => {
    render(<Select {...defaultProps} />);
    
    // Open dropdown
    fireEvent.click(screen.getByText("Option 1"));
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("displays correct count in multi mode", () => {
    render(
      <Select
        {...defaultProps}
        isMulti
        onChange={(value) => defaultProps.onChange(value)}
        value={["1", "2", "3"]}
      />
    );
    
    expect(screen.getByText("3 selected")).toBeInTheDocument();
  });
}); 