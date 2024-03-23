import React, { useState } from "react";
import "./DropDowns.css";
import { setFilters } from "../../app/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearSelection } from "../../app/slices/userSelectionSlice";
const DropDowns = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.users);
  const { teams } = useSelector((state) => state.team);
  const userSelection = useSelector((state) => state.userSelection);
  const [selectedTeam, setSelectedTeam] = useState("");
  const { gender, domain, availability } = filters;

  const addToTeamHandler = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/teams/${selectedTeam}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userList: userSelection.map((user) => user._id),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(clearSelection());
        alert("Users  added to team successfully!");
      } else {
        const errorMessage = await response.text();
        alert(
          JSON.parse(errorMessage).message || "Failed to add users to team"
        );
        console.error("Failed to add users:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Dropdowns_btns">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {gender === "" ? "Gender" : gender}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "" }))}
            >
              Select Gender
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Male" }))}
            >
              Male
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Female" }))}
            >
              Female
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Bigender" }))}
            >
              Bigender
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Polygender" }))}
            >
              Polygender
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Genderqueer" }))}
            >
              Genderqueer
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Genderfluid" }))}
            >
              Genderfluid
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ gender: "Agender" }))}
            >
              Agender
            </button>
          </li>
        </ul>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {domain === "" ? "Domain" : domain}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "" }))}
            >
              Select Domain
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "Ui Designing" }))}
            >
              Ui Designing
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "Management" }))}
            >
              Management
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "IT" }))}
            >
              IT
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "Finance" }))}
            >
              Finance
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "Marketing" }))}
            >
              Marketing
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ domain: "Sales" }))}
            >
              Sales
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() =>
                dispatch(setFilters({ domain: "Business Development" }))
              }
            >
              Business Development
            </button>
          </li>
        </ul>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {availability === ""
            ? "Availability"
            : availability === "true"
            ? "Available"
            : "Unavailable"}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ availability: "" }))}
            >
              Select Availability
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ availability: "true" }))}
            >
              Available
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(setFilters({ availability: "false" }))}
            >
              Unavailable
            </button>
          </li>
        </ul>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedTeam ? selectedTeam.name : "Select Team"}
        </button>
        <ul className="dropdown-menu">
          {teams?.map((team) => (
            <li key={team._id}>
              <button
                className="dropdown-item"
                onClick={() => setSelectedTeam(team)}
              >
                {team.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          id="btn-select"
          className="btn btn-info"
          onClick={addToTeamHandler}
          disabled={!selectedTeam}
        >
          Add to Team
        </button>
      </div>
    </div>
  );
};

export default DropDowns;
