import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./Masonry";
import Spinner from "./Spinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userUpdate } from "../store/actions/userActions";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none z-0";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none z-0";

const UserProfile = ({ openModelCallback, openModal }) => {
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const userData = JSON.parse(localStorage.getItem("profile"));
  const user = userData?.result;
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [wrongImageAvatarType, setWrongImageAvatarType] = useState(null);
  const [imageAssetAvatar, setImageAssetAvatar] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);
  //
  const [loadingWallpaper, setLoadingWallpaper] = useState(false);
  const [imageAssetWallpaper, setImageAssetWallpaper] = useState(user?.wallpaper);
  const [wrongImageWallpaperType, setWrongImageWallpaperType] = useState(null);
  if (!user) {
    navigate("/");
  }

  const openModelHandle = (data) => {
    openModelCallback(data);
  };
  const uploadImageWallpaper = async (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    ) {
      setWrongImageWallpaperType(false);
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingWallpaper(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setImageAssetWallpaper(data);
        setLoadingWallpaper(false);
      } catch (error) {
        setLoadingWallpaper(false);
      }
    } else {
      setWrongImageWallpaperType(true);
    }
  };
  const uploadImageAvatar = async (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    ) {
      setWrongImageAvatarType(false);
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingAvatar(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setImageAssetAvatar(data);
        setLoadingAvatar(false);
      } catch (error) {
        setLoadingAvatar(false);
      }
    } else {
      setWrongImageAvatarType(true);
    }
  };
  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [dispatch,text, userId]);

  const handleSubmit = () => {
    dispatch(
      userUpdate(userId, {
        userData: {
          email:user?.email,
          name: name,
          avatar: imageAssetAvatar,
          wallpaper: imageAssetWallpaper,
        },
      })
    );
    openModelCallback(false);
  };
  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      {openModal && (
        <div
          className="fixed  w-full h-full bg-black opacity-0"
          style={{ zIndex: 100 }}
          onClick={() => openModelHandle(false)}
        ></div>
      )}
      {openModal && (
        <div
          className="fixed bg-white left-1/2 top-1/3 z-50 p-4 rounded-md"
          style={{
            width: "720px",
            height: "auto",
            transform: `translateX(calc(-50% + 120px))`,
            zIndex: 1000,
          }}
        >
          <h4 className="w-full text-center font-semibold">
            Thay đổi thông tin
          </h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 border w-full rounded-md"
          />
          <div className="mt-2 flex justify-between ">
            <div className="relative flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-4 w-60 h-60 rounded-md ">
              <div className="absolute top-2">Ảnh đại diện</div>
              {loadingAvatar && (
                <div className="absolute top-1/3">
                  <Spinner />
                </div>
              )}
              {wrongImageAvatarType && <p>Sai định dạng ảnh</p>}
              {!imageAssetAvatar ? (
                <label className="w-60 h-60">
                  <div className="flex flex-col items-center justify-center h-full">
                    {!loadingAvatar && (
                      <>
                        <div className="flex flex-col justify-center items-center mt-8">
                          <p className="font-bold text-2xl ">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg ">Up ảnh</p>
                        </div>
                        <p className="mt-12 text-gray-400 w-4/5 text-center">
                          Vui lòng sử dụng ảnh dưới 20MB
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImageAvatar}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative w-60 h-60 rounded-full ">
                  <img
                    src={imageAssetAvatar}
                    alt="uploaded-pic"
                    className="h-40 w-40 object-cover rounded-full ml-10 mt-5"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAssetAvatar(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
            <div className="relative flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-4 w-full h-60 ml-2 rounded-md">
              <div className="absolute top-2">Ảnh tường</div>
              {loadingWallpaper && (
                <div className="absolute top-1/3">
                  <Spinner />
                </div>
              )}
              {wrongImageWallpaperType && <p>Sai định dạng ảnh</p>}
              {!imageAssetWallpaper ? (
                <label className="w-full h-60">
                  <div className="flex flex-col items-center justify-center h-full">
                    {!loadingWallpaper && (
                      <>
                        <div className="flex flex-col justify-center items-center mt-8">
                          <p className="font-bold text-2xl ">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg ">Up ảnh</p>
                        </div>
                        <p className="mt-12 text-gray-400 w-4/5 text-center">
                          Vui lòng sử dụng ảnh dưới 20MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImageWallpaper}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative  w-full h-48">
                  <img
                    src={imageAssetWallpaper}
                    alt="uploaded-pic"
                    className="h-full w-full object-cover mt-3 rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAssetWallpaper(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full mt-2 flex flex-row justify-end">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-40 outline-none"
            >
              Thay đổi
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div
            className="flex flex-col justify-center items-center "
            style={{
              paddingLeft: "20px",
              zIndex: 0,
            }}
          >
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={user?.wallpaper}
              alt="user-pic"
              style={{
                borderBottomRightRadius: "8px",
                borderBottomLeftRadius: "8px",
                overflow: "hidden",
                zIndex: 0,
              }}
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.avatar}
              alt="user-pic"
              style={{
                zIndex: 1,
              }}
            />
          </div>
          <div className="mt-3 flex justify-center items-center ">
            <h1 className="font-bold text-3xl text-center ml-12">
              {user.name}
            </h1>
            <span
              className="ml-2 mt-1 cursor-pointer relative"
              onClick={() => openModelHandle(true)}
            >
              <MdModeEdit size={20} />
            </span>
          </div>
        </div>
        <div className="text-center mb-7" style={{ zIndex: 0 }}>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
            style={{ zIndex: 0 }}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
            style={{ zIndex: 0 }}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
