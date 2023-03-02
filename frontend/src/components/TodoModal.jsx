import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { createGoal, updateGoal } from "../features/todo/todoSlice";

function TodoModal({ show, setShow }) {
  const { currentTodo,slug } = useSelector((state) => state.goals);
  const [text, setText] = useState("");
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
     if(currentTodo) {
       setTasks([...currentTodo.tasks]);
       setText(currentTodo.text)
     }
  },[currentTodo])

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !user) return;
    if(slug === 'create') {
      dispatch(createGoal({ text, user, tasks }));
    } else if(slug === 'edit') {
      dispatch(updateGoal({ _id : currentTodo._id, text, user, tasks }));
    }
    handleClose();
  };
  
  const handleAddTaks = () => {
    if(item === "") return;
    setTasks((prev) => [...prev, {isCompleted:false,title:item}]);
    setItem("");
  };
  
  

  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Add New</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <div className="">
            <div className="tasks p-2 rounded overflow-auto">
              <ListGroup variant="flush">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <ListGroup.Item className="rounded my-1" key={task._id}>
                      {task.title}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p className="text-center mt-5">There is no taks added</p>
                )}
              </ListGroup>
            </div>
            <div className="d-flex align-items-center my-2">
              <Form.Group controlId="formBasicEmail" className="flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="New Task"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </Form.Group>
              <Button variant="light" type="button" onClick={handleAddTaks}>
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#575757"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
                Add
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TodoModal;
