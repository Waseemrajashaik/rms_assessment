import { fireEvent, render, screen } from "@testing-library/react";

import { Table } from "../Table";

interface TestData {
  id: number;
  name: string;
  value: number;
}

describe("Table", () => {
  const mockData: TestData[] = [
    { id: 1, name: "Item 1", value: 100 },
    { id: 2, name: "Item 2", value: 200 },
    { id: 3, name: "Item 3", value: 300 },
  ];

  const columns = [
    { header: "ID", key: "id" as keyof TestData },
    { header: "Name", key: "name" as keyof TestData },
    { header: "Value", key: "value" as keyof TestData },
  ];

  const defaultProps = {
    columns,
    data: mockData,
    selectedRow: null,
    setSelectedRow: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers", () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("renders table rows with data", () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("handles row selection", () => {
    render(<Table {...defaultProps} />);
    
    const row = screen.getByText("Item 1").closest("tr");
    expect(row).toBeInTheDocument();
    fireEvent.click(row!);
    expect(defaultProps.setSelectedRow).toHaveBeenCalledWith(mockData[0]);
  });

  it("renders custom cell content when render function is provided", () => {
    const customColumns = [
      ...columns,
      {
        header: "Custom",
        key: "value" as keyof TestData,
        render: (value: number) => `$${value}`,
      },
    ];

    render(
      <Table
        {...defaultProps}
        columns={customColumns}
      />
    );

    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Table {...defaultProps} className="custom-table" />);
    const table = document.querySelector("table");
    expect(table).toHaveClass("custom-table");
  });
}); 