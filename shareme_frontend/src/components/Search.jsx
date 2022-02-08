import React, { useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import MasonryLayout from "./Masonry";
import Spinner from "./Spinner";
import { debounce } from "lodash";
import { getListPost, getSearchListPost } from "../store/actions/postActions";
import { postSearchSelectors } from "../store/selectors/postSelector";
const Search = ({ searchTerm, postSearchSelectors }) => {
  const debounceDropDown = useCallback(
    debounce((searchTerm) => fetchData(searchTerm), 300),
    []
  );
  const { load, posts: pins } = postSearchSelectors;
  const fetchData = (searchTerm) => {
    if (searchTerm !== "") {
      dispatch(getSearchListPost(searchTerm));
    } else {
      dispatch(getListPost());
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    debounceDropDown(searchTerm);
  }, [debounceDropDown, searchTerm]);
  console.log(postSearchSelectors);
  return (
    <div>
      {load && (
        <div style={{ marginTop: "100px" }}>
          <Spinner message="Đợi xí" />
        </div>
      )}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !load && (
        <div className="mt-10 text-center text-xl ">
          Không có bài viết phù hợp
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    postSearchSelectors: postSearchSelectors(state),
  };
}
export default connect(mapStateToProps)(Search);
