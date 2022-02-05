import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import MasonryLayout from "./Masonry";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import { debounce } from "lodash";
import { getListPost, getSearchListPost } from "../store/action";
const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const debounceDropDown = useCallback(
    debounce((searchTerm) => fetchData(...searchTerm), 300),
    []
  );
  const fetchData = (searchTerm) => {
    setLoading(true);
    setPins([]);
    const query = searchQuery(...searchTerm.toLowerCase());
    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (searchTerm !== "") {
      debounceDropDown(...searchTerm);
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchListPost(searchTerm));
  }, [searchTerm]);
  return (
    <div>
      {loading && (
        <div style={{ marginTop: "100px" }}>
          <Spinner message="Đợi xí" />
        </div>
      )}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">
          Không có bài viết phù hợp
        </div>
      )}
    </div>
  );
};

export default Search;
