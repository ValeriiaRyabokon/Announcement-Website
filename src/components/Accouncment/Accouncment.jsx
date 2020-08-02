import React from "react";
import "./Accouncment.scss";
import "../../index.scss";

const Accouncment = ({ items, visibleLists }) => {
  return (
  <div className="list">
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={visibleLists}>
          <i>{item.icon}</i>
          <i>
            <span>{item.name}</span>
          </i>
        </li>
      ))}
    </ul>
  </div>
)};

export default Accouncment;
