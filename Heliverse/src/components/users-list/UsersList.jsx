import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../listings/Listings.css";
import { addUser, removeUser } from "../../app/slices/userSelectionSlice";

const UsersList = () => {
  const { usersList } = useSelector((state) => state.users);
  const { selectedTeam } = useSelector((state) => state.team);
  const userSelection = useSelector((state) => state.userSelection);

  const dispatch = useDispatch();

  const handleTeam = (item) => {
    const newItem = { ...item, inTeam: true };
    const isAlreadyInTheSelectionList = userSelection.find(
      (item) => item.id === newItem.id
    )
      ? true
      : false;
    isAlreadyInTheSelectionList
      ? dispatch(removeUser(newItem))
      : dispatch(addUser(newItem));
  };

  if (!usersList.length)
    return <div style={{ color: "white" }}>No List to display...</div>;

  return (
    <div
      className={`row row-cols-md-4 g-4 row-cols-xl-${
        usersList.length > 2 ? "6" : "2"
      }`}
    >
      {usersList.map((item) => (
        <div key={item._id} className="col">
          <div className="card" style={{ minWidth: "200px" }}>
            {!selectedTeam?.id && (
              <input
                style={{ position: "absolute", top: 5, left: 3, width: "30px" }}
                className="input-box"
                type="checkbox"
                checked={userSelection
                  .map((user) => user._id)
                  .includes(item._id)}
                onChange={() => handleTeam(item)}
              />
            )}
            <img
              src={item.avatar}
              className="card-img-top"
              alt={item.altText}
            />
            <div className="card-body">
              <h5 className="card-title">
                {item.first_name} {item.last_name}
              </h5>
              <p className="card-text">{item.gender}</p>
              <p className="card-text">{item.domain}</p>

              <p
                className={`badge ${
                  item.available ? "bg-success" : "bg-danger"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
