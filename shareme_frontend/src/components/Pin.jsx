import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { savePost } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
const Pin = ({
  pin: { avatar, postedBy, selectedFile: image, _id, save, name },
}) => {
  const [postHovered, setPostHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const user = userData?.result;
  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === user?.googleId
  ).length;
  const savePin = (userId,postId) => {
    dispatch(savePost({userId,postId}))
  };

  return (
    <div className="m-2 z-5">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="w-full h-full object-cover z-0"
          alt="user-post"
          src={image}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
             <div className="flex gap-2">
                <a
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className=" rounded-full flex items-center  justify-center text-dark  text-xl opacity-75  hover:opacity-100 hover:shadow-md  outline-none"
                >
                  {/* <MdDownloadForOffline />*/}
                </a>
        </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100"
                >
                  {save?.length} Đã lưu
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(user?._id || "",_id);
                  }}
                >
                  Lưu
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {/*{destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}...`
                    : destination}
                </a>
                  )}
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}*/}
            </div>
          </div>
        )}
      </div>
     {/* <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center "
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            avatar ||
            "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop"
          }
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{name}</p>
        </Link>*/}
    </div>
  );
};

export default Pin;
