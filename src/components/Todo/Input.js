/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveToDo } from "../../store/todoConfig/toDoSlice";
import { startSaveToDo } from "../../store/todoConfig/thunks";

export const Input = () => {
  const dispatch = useDispatch();

  const { active: ToDo, isSaving } = useSelector((state) => state.todo);

  const { body, onInputChange, formState } = useForm(ToDo);

  useEffect(() => {
    dispatch(setActiveToDo(formState));
  }, [formState]);

  const onSaveToDo = () => {
    dispatch(startSaveToDo());
  };

  return (
    <>
      <div className="input__block">
        <input
          className="input"
          placeholder="Create New To Do"
          value={body}
          name="body"
          onChange={onInputChange}
        />
        <button className="btn" disabled={isSaving} onClick={onSaveToDo}>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </div>
    </>
  );
};
