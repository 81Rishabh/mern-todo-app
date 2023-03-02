import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/AddTodoForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/todo/todoSlice";
import Modal from "../components/TodoModal";
import ViewTodoModal from "../components/ViewTodoModal";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message, isUpdated } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
  }, [user,isError,navigate,message]);

  useEffect(() => {
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isUpdated]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Modal show={show} setShow={setShow} />
      <ViewTodoModal show={view} setShow={setView} />
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Todo List Dashboard</p>
      </section>

      <GoalForm setShow={setShow} />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem 
                 key={goal._id}
                  goal={goal} 
                  setView={setView}
                  show={show}
                  setShow={setShow}
                />
            ))}
          </div>
        ) : (
          <h5>You have not set any todo list</h5>
        )}
      </section>
    </React.Fragment>
  );
}

export default Dashboard;
