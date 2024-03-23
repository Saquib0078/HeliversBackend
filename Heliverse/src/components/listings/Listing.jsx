import React from "react";
import UsersList from "../users-list/UsersList";
import Pagination from "../users-list/Pagination";

const Listing = () => {
  return (
    <div className="user-list-container">
      <UsersList />
      <Pagination />
    </div>
  );
};

export default Listing;
