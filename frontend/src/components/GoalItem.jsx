import { useDispatch } from "react-redux";
import { currentTask, deleteGoal, setSlug } from "../features/todo/todoSlice";
import { Card, Button } from "react-bootstrap";

function GoalItem({ goal, setView , show , setShow }) {
  const dispatch = useDispatch();

  const handleTodoView = (ID) => {
    setView(true);
    dispatch(currentTask(ID));
  };
  
  const handleEdit = (ID) => {
    dispatch(setSlug('edit'));
    dispatch(currentTask(ID));
    setShow(true);
  };
  

  return (
    <Card style={{ width: "18rem", cursor: "pointer" }}>
      <Card.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="fs-6 text-dark text-capitalize">{goal.text}</h3>
        <button
          onClick={() => dispatch(deleteGoal(goal._id))}
          className="close"
        >
          <svg
            width="17"
            height="17"
            fill="none"
            stroke="#ff7070"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        </button>
      </Card.Header>
      <Card.Body className="text-start d-flex justify-content-between align-items-center">
        <Card.Text
          className="text-dark mt-2 flex-grow-1"
          style={{ fontSize: ".9rem" }}
        >
          <span>{goal.tasks.length} items</span>
        </Card.Text>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleTodoView(goal._id)}
        >
          <span>View</span>
        </Button>
        <Button
          variant="outline-light"
          size="sm"
          onClick={() => handleEdit(goal._id)}
        >
          <span className="text-dark">Edit</span>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default GoalItem;
