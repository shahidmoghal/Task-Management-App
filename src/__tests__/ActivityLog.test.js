jest.mock("react-dnd");
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.jsx";

describe("Activity Log Tests", () => {
  test("logs task creation", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Log Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    expect(await screen.findByText(/Task created: Log Task/i)).toBeInTheDocument();
  });

  test("logs task status update", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Move Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.mouseDown(screen.getByText("Move Task"));
    fireEvent.mouseUp(screen.getByText("In Progress"));

    expect(await screen.findByText(/Task moved to In Progress/i)).toBeInTheDocument();
  });

  test("logs task deletion", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Delete Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.click(await screen.findByText(/Delete/i));

    expect(await screen.findByText(/Task deleted: Delete Task/i)).toBeInTheDocument();
  });
});
