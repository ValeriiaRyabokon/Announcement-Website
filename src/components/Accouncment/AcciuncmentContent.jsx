import React from "react";
import "./AccouncmentContent.scss";
import "../../index.scss";


const AccouncmentContent = ({ items, isRemovable }) => {
  return (
    <div className="content">
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>Час додавання: {item.time}</span>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AccouncmentContent;
