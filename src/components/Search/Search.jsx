import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";
import "../AddButtonAcc/AddButtonAcc.scss";
import "../../index.scss";
import iconSearch from "../../assets/img/iconSearch.svg";
import iconClose from "../../assets/img/iconeClose.png";

export default function Search({searchList}) {
  const [inputSearchValue, setInputSearchValue] = useState("");

  const [searchAccouncment, setSearchAccouncment] = useState([]);

  useEffect(() => {
    console.log(inputSearchValue);
    setSearchAccouncment([]);
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      let arr = data.filter(item => item.name.indexOf(inputSearchValue) + 1);
      setSearchAccouncment(arr.slice(0,3));
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

      {searchAccouncment.length !== 0 && inputSearchValue && (
        <div className="search__content">
          {searchAccouncment.map(e => (
            <div key={e.id} onClick={()=>searchList(searchAccouncment, e.id)}>{e.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
