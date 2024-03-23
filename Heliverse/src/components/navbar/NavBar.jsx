import React, { useState } from "react";
import "./NavBar.css";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../app/slices/usersSlice";
const NavBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="navParent">
      <nav
        id="nav"
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand">HeliVerse Assignment</a>

          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={handleInputChange}
              value={query}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
