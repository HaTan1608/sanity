import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import axios from "axios";
import Spinner from "./Spinner";
import { categories } from "../utils/data";
import { createPost } from "../store/actions/postActions";
const CreatePin = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("profile"));
  const user = userData?.result;
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    ) {
      setWrongImageType(false);
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoading(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setImageAsset(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setWrongImageType(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && about && imageAsset && category) {
      dispatch(
        createPost(
          {
            postData: {
              title: title,
              message: about,
              category: category,
              selectedFile: imageAsset,
              creator: user?._id,
              avatar:
                user?.avatar ||
                "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop",
              name: user?.name,
            },
          },
          navigate
        )
      );
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Vui lòng điền đủ thông tin.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Sai định dạng ảnh</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Up ảnh</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Vui lòng sử dụng ảnh dưới 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={
                  user?.avatar ||
                  "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop"
                }
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user?.name}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Nội dung"
            className="outline-none text-base sm:text-lg  border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Thể loại
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
