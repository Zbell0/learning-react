import React from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  console.log(location);

  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  return null;
}

export default Search;
