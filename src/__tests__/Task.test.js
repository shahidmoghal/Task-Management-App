jest.mock("react-dnd");
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.jsx";

describe("Task CRUD Operations", () => {
  test("adds a new task", async () => {
    render(<KanbanBoard />);
    
    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), { target: { value: "This is a test task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    expect(await screen.findByText("New Task")).toBeInTheDocument();
  });

  test("updates a task", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Update Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    const editButton = await screen.findByText(/Edit/i);
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Update Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(await screen.findByText(/Updated Task/i)).toBeInTheDocument();
  });

  test("deletes a task", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Delete Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Delete Task/i)).not.toBeInTheDocument();
  });
});
