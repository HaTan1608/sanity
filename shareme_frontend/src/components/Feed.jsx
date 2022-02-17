import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { getListPost } from "../store/actions/postActions";
import { getSavePost } from "../store/actions/userActions";
import { postSearchSelectors } from "../store/selectors/postSelector";
import MasonryLayout from "./Masonry";
import Spinner from "./Spinner";
const Feed = ({ postSearchSelectors }) => {
  const { categoryId } = useParams();
  const category = categoryId || "";
  const userData = JSON.parse(localStorage.getItem("profile"));
  const user = userData?.result;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPost(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (user) {
      dispatch(getSavePost(user._id));
    }
  }, []);
  const { load: loading, posts: pins } = postSearchSelectors;
  if (loading)
    return (
      <div style={{ marginTop: "100px" }}>
        <Spinner message="Đợi xí ^^" />
      </div>
    );
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

function mapStateToProps(state) {
  return {
    postSearchSelectors: postSearchSelectors(state),
  };
}
export default connect(mapStateToProps)(Feed);
