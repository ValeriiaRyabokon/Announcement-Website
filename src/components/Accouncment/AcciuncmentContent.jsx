import React, { useState} from "react";
import "./AccouncmentContent.scss";
import axios from "axios";
import iconDelete from "../../assets/img/iconDelete.png";
import iconChange from "../../assets/img/iconChange.png";
import iconDetail from "../../assets/img/iconSearch.png";

const AccouncmentContent = ({ items, onEdit, onDelete, searchList,visible, setVisible}) => {
   const [inputNameValue, setInputNameValue] = useState("");
  const [inputDetailValue, setInputDetailValue] = useState("");

  const deleteAccouncment = item => {
    if (window.confirm("Ви дійсно хочете видалити це оголошення?")) {
      axios.delete(`http://localhost:3001/announcments/${item.id}`).then(() => {
        onDelete(item.id);
      });
    }
  };

  const visibleItem = (obj, id) => {
    searchList(obj, id);
    setVisible({...visible, visibleValue: false,visibleDetails: true});

  };



  return (
    <div className="content">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Time</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="name">
                <h4>{item.name}</h4>
                {visible.visibleValue && (
                  <div className="change-form">
                    <input
                      type="text"
                      value={inputNameValue}
                      onChange={e => setInputNameValue(e.target.value)}
                      placeholder="new title"
                    />
                    <button
                      onClick={() =>
                        onEdit(item.id, "name", inputNameValue)
                      }
                      className="button"
                    >
                     Change
                    </button>
                  </div>
                )}
                {visible.visibleDetails && (
                  <div>
                    <span>Description:{item.detail}</span>
                    <span className="icon">
                      <img
                        src={iconChange}
                        alt="Icon Change"
                        onClick={() => setVisible({...visible,visibleValue:true})}
                      />
                      
                        <img
                          src={iconDelete}
                          onClick={() => deleteAccouncment(item)}
                          alt="Icon Delete"
                        />
                     
                    </span>
                    {visible.visibleValue && (
                      <div className="change-form">
                        <input
                          type="text"
                          value={inputDetailValue}
                          onChange={e => setInputDetailValue(e.target.value)}
                          placeholder="new description"
                        />
                        <button
                          onClick={() =>
                            onEdit(item.id, "detail", inputDetailValue)
                          }
                          className="button"
                        >
                          Змінити
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td className="content__time">{item.time}</td>
              {visible.visibleSearch && (
                <td>
                  <img
                    src={iconDetail}
                    onClick={() => visibleItem(item, item.id)}
                    alt="Icon "
                  />
                </td>
              )}
            </tr>
          ))}
        
        </tbody>
      </table>
    </div>
  );
};
export default AccouncmentContent;
