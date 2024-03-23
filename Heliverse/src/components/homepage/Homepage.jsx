import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import DropDowns from "../dropdown/DropDowns";
import Listing from "../listings/Listing";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPages, setUsersList } from "../../app/slices/usersSlice";
import SideNav from "../side-nav-bar-for-team/SideNav";
import "./Homepage.css";

const Homepage = () => {
  const limit = 20;
  const dispatch = useDispatch();
  const { page, searchQuery, filters } = useSelector((state) => state.users);
  const { gender, domain, availability } = filters;

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users?page=${page}&limit=${limit}&search=${searchQuery}&gender=${gender}&domain=${domain}&availability=${availability}`
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setUsersList(data.user));
        dispatch(setTotalPages(Math.ceil(data.totalUser / limit)));
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page, searchQuery, gender, domain, availability]);

  return (
    <div className="homepage">
      <NavBar />
      <div className="side-nav-and-content-container">
        <div className="side-nav">
          <SideNav />
        </div>
        <div>
          <DropDowns />
          <Listing />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
