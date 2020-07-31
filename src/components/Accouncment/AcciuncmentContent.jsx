import React from "react";
import "./AccouncmentContent.scss";
import axios from "axios";
import "../../index.scss";
import iconDelete from "../../assets/img/iconDelete.png";
import iconChange from "../../assets/img/iconChange.png";

const AccouncmentContent = ({ items, isRemovable, onEditName, onDelete, onEditDetail }) => {
  const deleteAccouncment=item=>{
    if(window.confirm('Ви дійсно хочете видалити це оголошення?')){
      axios.delete('http://localhost:3001/announcments/' + item.id).then(() => {
        onDelete(item.id);
      });
    }
  }
  return (
    <div className="content">
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>Назва:{item.name}
            <img
                src={iconChange}
                onClick={() => onEditName(item, item.id)}
                alt="Icon Change"
              /></span>
            <span>Опис:{item.detail}
            <img
                src={iconChange}
                onClick={() => onEditDetail(item, item.id)}
                alt="Icon Change"
              /></span>
            <div>
              <span>Час додавання: {item.time}</span>

      
              <img
                src={iconDelete}
                onClick={() => deleteAccouncment(item)}
                alt="Icon Delete"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AccouncmentContent;
