import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/userActions";
const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //if (!user) return null;
  const [openUser, setOpenUser] = useState(false);
  const handleLogout = () => {
    setUserData(null);
    dispatch(userLogout());
  };
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const user = userData?.result;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5">
      <div
        className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm"
        style={{ height: "3rem" }}
      >
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <div
          className="hidden md:block relative z-1000"
          onMouseOver={() => setOpenUser(true)}
          onMouseLeave={() => setOpenUser(false)}
        >
          {user?._id ? (
            <>
              {" "}
              <img
                src={
                  user?.avatar ||
                "https://shareme-bucket.s3.amazonaws.com/avatar.jpeg"
                }
                alt="user"
                className="w-14 h-12 rounded-full object-cover"
              />
              <div className="h-2"></div>
              <ul
                className="absolute bg-white right-0 top-15  w-190 p-4 rounded-lg"
                
                style={openUser ? { display: "block" ,zIndex:"1000"} : { display: "none" }}
              >
                <li className="font-semibold text-base cursor-pointer">
                  <Link to={`user-profile/${user?._id}`}>Trang cá nhân</Link>
                </li>
                <li
                  className="font-semibold text-base cursor-pointer mt-2"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </li>
              </ul>
            </>
          ) : (
            <>
              <img
                src={
                  "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop"
                }
                alt="user"
                className="w-14 h-12 rounded-lg object-cover"
              />
              <div className="h-2"></div>
              <ul
                className="absolute z-1000 bg-white right-0 top-15  w-190 p-4 rounded-lg"
                style={openUser ? { display: "block",zIndex:"1000" } : { display: "none" }}
              >
                <li className="font-semibold text-base cursor-pointer ">
                  <Link to={`account/register`}>Tạo tài khoản</Link>
                </li>
                <li
                  className="font-semibold text-base cursor-pointer mt-2"
                  onClick={handleLogout}
                >
                  <Link to={`account/login`}>Đăng nhập</Link>
                </li>
              </ul>
            </>
          )}
        </div>
        {user?._id && (
          <Link
            to="create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14  md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
