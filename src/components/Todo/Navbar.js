import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="nav__container">
      <h3 className="nav__user">{displayName}</h3>

      <button className="btn" onClick={onLogout}>
        <i className="fa-solid fa-power-off"></i>
        Logout
      </button>
    </div>
  );
};
