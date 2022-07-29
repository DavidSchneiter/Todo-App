import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "./Navbar";
import { ToDo } from "./ToDo";
import { Input } from "./Input";
import { startDeletingCompleted } from "../../store/journal/thunks";
export const TodoScreen = () => {
  const dispatch = useDispatch();

  const { notes } = useSelector((state) => state.journal);

  const [buttonClicked, setButtonClicked] = useState("all");

  const handleAll = () => {
    setButtonClicked("all");
  };
  const handleActive = () => {
    setButtonClicked("active");
  };

  const handleComplete = () => {
    setButtonClicked("complete");
  };

  const handleClear = () => {
    dispatch(startDeletingCompleted());
  };

  const complete = notes.filter((note) => note.complete);
  const active = notes.filter((note) => !note.complete);

  return (
    <div className="todo__main">
      <Navbar />
      <div className="todo__bg">
        <div className="todo__main-container">
          <div className="todo__container">
            <h1>T O D O</h1>

            <button className="btn">
              <span className="fa-solid fa-sun" />
            </button>
          </div>

          <div className="input__container">
            <Input />
          </div>

          <ul className="list__container">
            {
              buttonClicked === "complete"
                ? complete.map((note) => <ToDo key={note.id} {...note} />)
                : buttonClicked === "all"
                ? notes.map((note) => <ToDo key={note.id} {...note} />)
                : active.map((note) => <ToDo key={note.id} {...note} />)
              // notes.map( note => (
              // 	<ToDo key={ note.id } { ...note } />
              // ))
            }
          </ul>

          <div className="input__block flex">
            <div>
              <p> {active.length} items left</p>
            </div>
            <div>
              <button className="btn" onClick={handleAll}>
                All
              </button>
              <button className="btn" onClick={handleActive}>
                Active
              </button>
              <button className="btn" onClick={handleComplete}>
                Complete
              </button>
            </div>

            <div>
              <button className="btn" onClick={handleClear}>
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
