import React, { useState } from "react";
import axios from "axios";
import "./AddButtonAcc.scss";
import "../../index.scss";

import iconPlus from "../../assets/img/iconPlus.png";
import IconClose from "../../assets/img/iconeClose.png";

const AddButtonAcc = ({ onAdd }) => {
  const [visibleAddButton, setVisibleAddButton] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputDetailsValue, setInputDetailsValue] = useState("");

  const addAccouncment = () => {
    if (!inputDetailsValue) {
      alert("Hey!");
      return;
    }
    const time = new Date().toLocaleDateString();

    axios
      .post("http://localhost:3001/announcments", {
        name: inputTitleValue,
        time: time,
        detail: inputDetailsValue
      })
      .then(({ data }) => {
        onAdd(data);
      });

    setInputTitleValue("");
    setInputDetailsValue("");
  };
  return (
    <div className="add__button">
      {visibleAddButton ? (
        <div className="add__button__snippet">
          <div className="add__button__snippet__icon">
            <img
              onClick={() => {
                setVisibleAddButton(false);
                setInputTitleValue("");
                setInputDetailsValue("");
              }}
              src={IconClose}
              alt="Icon Close"
            />
          </div>
          <input
            value={inputTitleValue}
            onChange={e => setInputTitleValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Введіть назву оголошення"
          />
          <input
            value={inputDetailsValue}
            onChange={e => setInputDetailsValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Введіть інформацію про оголошення"
          />
          <button onClick={addAccouncment} className="button--add">
            Додати
          </button>
        </div>
      ) : (
        <div
          className="button--add"
          onClick={() => setVisibleAddButton(!visibleAddButton)}
        >
          <img src={iconPlus} alt="icon Megafone" />
          <span>Додати оголошеня</span>
        </div>
      )}
    </div>
  );
};
export default AddButtonAcc;
