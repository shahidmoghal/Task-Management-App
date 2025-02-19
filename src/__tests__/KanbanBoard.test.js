jest.mock("react-dnd");
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.jsx";

describe("UI Interactions", () => {
  test("filters tasks by priority", async () => {
    render(<KanbanBoard />);
    
    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "High Priority Task" } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: "High" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.change(screen.getByLabelText(/Filter by Priority/i), { target: { value: "High" } });

    expect(await screen.findByText(/High Priority Task/i)).toBeInTheDocument();
  });

  test("sorts tasks by due date", async () => {
    render(<KanbanBoard />);
    
    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Earlier Task" } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: "2023-10-01" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Later Task" } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: "2023-11-01" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.change(screen.getByLabelText(/Sort By/i), { target: { value: "asc" } });

    const tasks = await screen.findAllByTestId("task-title");
    expect(tasks[0].textContent).toBe("Earlier Task");
  });

  test("allows drag and drop", async () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Draggable Task" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    fireEvent.mouseDown(screen.getByText("Draggable Task"));
    fireEvent.mouseUp(screen.getByText("In Progress"));

    expect(await screen.findByText(/Draggable Task/i)).toBeInTheDocument();
  });
});
