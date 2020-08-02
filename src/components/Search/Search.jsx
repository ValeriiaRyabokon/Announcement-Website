import React, { useState, useEffect, useCallback } from "react";
//import useDebounce from "./use-debounce";
import axios from "axios";
import _ from "lodash";

import "./Search.scss";
import "../AddButtonAcc/AddButtonAcc.scss";
import "../../index.scss";

export default function Search({ searchLists, visibleLists }) {
  const [inputSearchValue, setInputSearchValue] = useState("");

  const onSearch = text => {
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      let arr = data.filter(item => item.name.indexOf(text) + 1);
      searchLists(arr.slice(0, 3));
      if (!text) {
        visibleLists();
        return;
      }
    });
  };

  const debounceHandleChange = useCallback(
    _.debounce(data => onSearch(data), 1000),
    []
  );

  const onChange = e => {
    setInputSearchValue(e.target.value);
    debounceHandleChange(e.target.value);
  };

  return (
    <div className="search">
      <input
        value={inputSearchValue}
        onChange={onChange}
        type="text"
        placeholder="Search announcements by title"
      />
    </div>
  );
}
