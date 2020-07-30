import React from "react";
import "./Accouncment.scss";
import "../../index.scss";


const Accouncment = ({ items, onClick }) => { 
  return (
    <div className="list">
      <ul onClick={onClick}>
        {items.map((item,index)=> (
          <li key={index}>
            <i>
              {item.icon}
            </i>
            <i>
              <span>{item.name}</span>
            </i>
          </li>
        ))}
      </ul>
     
    </div>
  );
};
export default Accouncment;
