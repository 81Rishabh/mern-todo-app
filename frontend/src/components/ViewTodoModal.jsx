import React from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatedTasks, updateGoal } from "../features/todo/todoSlice";

function ViewTodoModal({ show, setShow }) {
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const { currentTodo } = useSelector((state) => state.goals);


  const onCompleted = (e, ID) => {
    const checkedIcon = document.getElementById(`svg-${ID}`);
    let todo = currentTodo.tasks.filter((task) => task._id === ID);

    if (e.target.checked) {
      checkedIcon.classList.add("d-block");
      checkedIcon.classList.remove("d-none");
      dispatch(updatedTasks({ID,complete : true}));
    } else {
        checkedIcon.style.display = "none";
        checkedIcon.classList.remove("d-block");
        todo.isCompleted = false;
        dispatch(updatedTasks({ID,complete : false}));
    }
  };

  const handleSaveUpdatedTodo = () => {
    dispatch(
      updateGoal(currentTodo)
    );
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      {currentTodo && (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title>{currentTodo.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-6 bg-light">
            <ListGroup variant="flush">
              {currentTodo.tasks.map((task) => (
                <ListGroup.Item
                  className="d-flex align-items-center justify-content-between rounded my-1"
                  key={task._id}
                >
                  <p
                    className="text d-flex align-items-center"
                    id={`text-${task._id}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="#37ff00"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      id={`svg-${task._id}`}
                      className={`${!task.isCompleted ? 'd-none' : 'd-block' } mr-2`}
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42Z"></path>
                    </svg>
                    <span style={{ marginLeft: ".5rem" }}> {task.title}</span>
                  </p>

                  <Form.Group
                    controlId="formBasicCheckbox"
                    onChange={(e) => onCompleted(e, task._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Form.Check type="checkbox"/>
                  </Form.Group>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              varient="primary"
              type="button"
              onClick={handleSaveUpdatedTodo}
            >
              save
            </Button>
          </Modal.Footer>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default ViewTodoModal;
