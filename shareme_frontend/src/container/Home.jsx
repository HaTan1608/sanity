import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { client } from "../client";
import logo from "../assets/logo.png";
import { fetchUser } from "../utils/fetchUser";
import { userSelectors } from "../store/selectors/userSelector";
import { connect } from "react-redux";
const Home = ({ userSelectors }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
  const { user } = userSelectors;
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-pink-100 w-full min-h-screen">
      <div
        className="flex md:flex-row flex-col transaction-height duration-75 ease-in min-h-100vh"
        style={{ maxWidth: "1280px", margin: "auto" }}
      >
        <div className="hidden md:flex flex-initial ">
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to="/">
              <img src={logo} alt="logo" className="w-28" />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="logo" className="w-28" />
            </Link>
          </div>

          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>

        <div className="pb-2 flex-1 min-h-screen" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    userSelectors: userSelectors(state),
  };
}
export default connect(mapStateToProps)(Home);
