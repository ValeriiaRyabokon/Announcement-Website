import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";
import "../AddButtonAcc/AddButtonAcc.scss";
import "../../index.scss";
import iconSearch from "../../assets/img/iconSearch.svg";
import iconClose from "../../assets/img/iconeClose.png";

export default function Search({ lists }) {
  const [inputSearchValue, setInputSearchValue] = useState("");
  
  const [searchAccouncment, setSearchAccouncment] = useState(null);
 

  useEffect(() => {
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      data.filter(item => {
        if (item.name === inputSearchValue) {
          setSearchAccouncment(item);
        }
        return item;
      });
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
     
      {searchAccouncment && inputSearchValue &&(
        <div className="search__content">{searchAccouncment.name}</div>
      )}
    </div>
  );
}
