import React, { useEffect } from "react";
import "./SideNav.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTeam } from "../../app/slices/teamSlice";
import { setUsersList } from "../../app/slices/usersSlice";

const TeamItem = ({ name, id }) => {
  const dispatch = useDispatch();
  const { selectedTeam } = useSelector((state) => state.team);
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/team/${selectedTeam.id}`
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setUsersList(data.team.users));
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedTeam?.id != "" && fetchUser();
  }, [selectedTeam]);
  return (
    <div
      className={`team-item ${selectedTeam.id === id ? "active" : ""}`}
      onClick={() => {
        dispatch(setSelectedTeam({ name, id }));
      }}
    >
      {name}
    </div>
  );
};

export default TeamItem;
