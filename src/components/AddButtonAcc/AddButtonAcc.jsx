import React, { useState } from "react";
import axios from "axios";
import "./AddButtonAcc.scss";
import "../../index.scss";

import Accouncment from "../Accouncment/Accouncment";
import iconPlus from "../../assets/img/iconPlus.png";
import IconClose from "../../assets/img/iconeClose.png";

const AddButtonAcc = ({ items, onAdd }) => {
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
      .then(({data}) => {
        onAdd(data)
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
          <button onClick={addAccouncment} className="button">
            Додати
          </button>
        </div>
      ) : (
        <Accouncment
          onClick={() => setVisibleAddButton(!visibleAddButton)}
          items={[
            {
              icon: <img src={iconPlus} alt="icon Megafone" />,
              name: "Додати оголошення"
            }
          ]}
        />
      )}
    </div>
  );
};
export default AddButtonAcc;
