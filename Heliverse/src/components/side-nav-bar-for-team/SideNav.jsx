import React, { useEffect, useState } from "react";
import "./SideNav.css";
import TeamItem from "./TeamItem";
import { useDispatch, useSelector } from "react-redux";
import { setTeams } from "../../app/slices/teamSlice";
import { setUsersList } from "../../app/slices/usersSlice";

const SideNav = () => {
  const { teams, selectedTeam } = useSelector((state) => state.team);
  const [teamNameToCreate, setTeamNameToCreate] = useState("");
  const dispatch = useDispatch();
  const fetchTeams = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/teams`);

      if (response.ok) {
        const data = await response.json();
        dispatch(setTeams(data.team));
      } else {
        console.error("Failed to fetch teams:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`);

      if (response.ok) {
        const data = await response.json();
        dispatch(setUsersList(data.user));
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedTeam?.id === "" && fetchUser();
  }, [selectedTeam]);

  const createTeamHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamNameToCreate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        fetchTeams();
        setTeamNameToCreate("");
        alert("Team  created successfully!");
      } else {
        console.error("Failed to create team:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="teams-list-container">
      <div>
        <div className="mb-3">
          <label className="form-label">Create Team</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setTeamNameToCreate(e.target.value);
            }}
            id="exampleFormControlInput1"
            placeholder="Name"
            value={teamNameToCreate}
          />
          <button
            id="create-btn"
            type="button"
            className="btn btn-primary"
            onClick={createTeamHandler}
          >
            Add Team
          </button>
        </div>
      </div>
      <TeamItem name={"All"} id="" />
      {teams?.map((team) => {
        return <TeamItem name={team.name} id={team._id} key={team._id} />;
      })}
    </div>
  );
};

export default SideNav;
