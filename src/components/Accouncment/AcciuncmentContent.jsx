import React, { useState } from "react";
import "./AccouncmentContent.scss";
import axios from "axios";
import "../../index.scss";
import iconDelete from "../../assets/img/iconDelete.png";
import iconChange from "../../assets/img/iconChange.png";
import iconDetail from "../../assets/img/iconSearch.svg";

const AccouncmentContent = ({ items, onEdit, onDelete, searchList }) => {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [inputNameValue, setInputNameValue] = useState("");
  const [visibleValue, setVisibleValue] = useState(false);
  const deleteAccouncment = item => {
    if (window.confirm("Ви дійсно хочете видалити це оголошення?")) {
      axios.delete("http://localhost:3001/announcments/" + item.id).then(() => {
        onDelete(item.id);
      });
    }
  };

  return (
    <div className="content">
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>
              <span className="text">Назва:{item.name}</span>
              
              {visibleValue && (
                <div>
                  <input
                    type="text"
                    value={inputNameValue}
                    onChange={e => setInputNameValue(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      onEdit(item, item.id, "name", inputNameValue)
                    }
                    className="button"
                  >
                    Змінити
                  </button>
                </div>
              )}
               <span className="day">Час додавання: {item.time}</span>
              <img
                src={iconDelete}
                onClick={() => deleteAccouncment(item)}
                alt="Icon Delete"
              />
              <img
                src={iconChange}
                onClick={() => setVisibleValue(true)}
                alt="Icon Change"
              />
              <img
                src={iconDetail}
                onClick={() => setVisibleDetails(!visibleDetails)}
                alt="Icon Change"
              />
            </div>

            {visibleDetails && item.id && (
              <div>
                <span>Опис:{item.detail}</span>
                <img
                  src={iconChange}
                  alt="Icon Change"
                  onClick={() => setVisibleValue(!visibleValue)}
                />
                {visibleValue && (
                  <div>
                    <input
                      type="text"
                      value={inputNameValue}
                      onChange={e => setInputNameValue(e.target.value)}
                    />
                    <button
                      onClick={() =>
                        onEdit(item, item.id, "detail", inputNameValue)
                      }
                      className="button"
                    >
                      Змінити
                    </button>
                  </div>
                )}
                
              </div>
            )}
           
         
            
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AccouncmentContent;
