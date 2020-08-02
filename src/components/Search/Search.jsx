import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";
import "../AddButtonAcc/AddButtonAcc.scss";
import "../../index.scss";

export default function Search({ searchLists}) {
  const [inputSearchValue, setInputSearchValue] = useState("");

  const [searchAccouncment, setSearchAccouncment] = useState([]);

  useEffect(() => {
    setSearchAccouncment([]);
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      let arr = data.filter(item => item.name.indexOf(inputSearchValue)+1);
      setSearchAccouncment(arr);
      searchLists(searchAccouncment.slice(0, 3))

    });
  }, [inputSearchValue]);


  return (
    <div className="search">
      <input
        value={inputSearchValue}
        onChange={e => setInputSearchValue(e.target.value)}
        type="text"
        placeholder="Введіть дані для пошуку"
      />
    </div>
  );
}
