import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./Masonry";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
import { getPostById } from "../store/actions/postActions";
import { connect, useDispatch } from "react-redux";
import { postSearchSelectors } from "../store/selectors/postSelector";
const PinDetail = ({ user, postSearchSelectors }) => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();
  console.log(user);
  const dispatch = useDispatch();
  const { posts: pins, post: pinDetail, load } = postSearchSelectors;
  useEffect(() => {
    dispatch(getPostById(pinId));
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  }, [pinId]);
  console.log(pinDetail);
  if (!pinDetail)
    return (
      <div style={{ marginTop: "100px" }}>
        <Spinner message="Loading pin..." />
      </div>
    );

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white xl:flex-row mt-5"
        style={{ maxWidth: "1500px", borderRadius: "16px" }}
      >
        <div
          className="flex justify-center items-center md:items-start flex-initial xl:w-3/5 xl:max-h-[calc(100vh-120px)] rounded-lg  xl:rounded-l-lg"
          style={{
            backgroundImage:
              "url(" +
              "https://www.teahub.io/photos/full/34-342401_pink-love-background-pictures-background-image-for-love.jpg" +
              ")",
          }}
        >
          <img
            src={pinDetail?.selectedFile}
            className="rounded-lg rounded-b-lg xl:w-full xl:h-full xl:object-contain xl:rounded-l-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:w-2/5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.selectedFile}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center  justify-center text-dark  text-xl opacity-75  hover:opacity-100 hover:shadow-md  outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noneferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.message}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail?.creator}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={
                pinDetail?.avatar ||
                "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop"
              }
              alt="user-profile"
            />
            <p className="font-semibold capitalize">{pinDetail?.name}</p>
          </Link>
          <h2 className="mt-5 text-2xl">Bình luận</h2>
          <div className="max-h-370 overflow-y-auto mt-1">
            {pinDetail?.comments?.map((comment, index) => (
              <div
                className="flex gap-2 mt-1 items-center bg-white rounded-lg"
                key={index}
              >
                <img
                  src={
                    comment?.avatar ||
                    "https://genvita.vn/resources/avatar/222a5011-fb0b-4457-a66d-65b8924b560c?width=119&height=119&mode=crop"
                  }
                  alt="user-profile"
                  className="w-8 h-8 rounded-full cursor-pointer object-cover"
                  
                />
                <div className="flex flex-row w-full">
                  <p className="font-bold">{comment?.name}</p>
                  <p className="ml-4">{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user?._id}`}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.image}
                alt="user-profile"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            >
              {addingComment ? "Đang gửi ...." : "Gửi"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            Có thể bạn sẽ thích
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    postSearchSelectors: postSearchSelectors(state),
  };
}
export default connect(mapStateToProps)(PinDetail);
